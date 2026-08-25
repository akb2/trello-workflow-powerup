import { isDefined } from "@akb2/types-tools";
import { buttonComponent } from "../../components/button/button";
import { userFullBadgeComponent } from "../../components/user-full-badge/user-full-badge";
import { APP_OPTIONS } from "../../data/app-settings";
import { ListType } from "../../models/list-type";
import { TrelloPowerUpContext } from "../../models/trello-power-up-context";
import { connectStyle } from "../../utils/connect-style";
import { getBoardSettings } from "../../utils/get-board-settings";
import { getListSettings } from "../../utils/get-list-settings";
import { lucideIcon } from "../../utils/lucide-icon";
import { openMemberPicker } from "../../utils/open-member-picker";
import { setBoardSettings } from "../../utils/set-board-settings";
import { setListSettings } from "../../utils/set-list-settings";
import styles from "./styles.css?url";

const t = window.TrelloPowerUp.iframe(APP_OPTIONS);
const rootContainer = document.getElementById("root-container");

let renderPromise = Promise.resolve();

if (!isDefined(rootContainer)) {
  throw new Error("Root container not found");
}

/**
 * Render's functions
 */

const saveButtonRender = async (trelloContext: TrelloPowerUpContext) => {
  const actionsContainer = document.getElementById("actions");

  if (!isDefined(actionsContainer)) {
    throw new Error("Actions container not found");
  }

  const settings = await getBoardSettings(trelloContext);
  const prefixInput = document.getElementById("task-number-prefix") as HTMLInputElement;

  const [saveButton, closeButton] = await Promise.all([
    buttonComponent({
      trelloContext,
      icon: lucideIcon('save'),
      theme: 'primary',
      text: 'Save',
      callback: async (trelloContext) => {
        await setBoardSettings(trelloContext, {
          ...settings,
          taskPrefix: prefixInput.value.trim(),
        });

        trelloContext.closePopup();
      }
    }),
    buttonComponent({
      trelloContext,
      icon: lucideIcon('x'),
      theme: 'secondary',
      text: 'Cancel',
      callback: trelloContext => trelloContext.closePopup()
    })
  ]);

  actionsContainer.replaceChildren();
  actionsContainer.appendChild(closeButton);
  actionsContainer.appendChild(saveButton);
};

const listsRender = async (trelloContext: TrelloPowerUpContext) => {
  const listsContainer = document.getElementById("list-assignees-container");
  const lists = await trelloContext.lists("id", "name");
  const listTypes = Object.values(ListType);

  if (!isDefined(listsContainer)) {
    throw new Error("Lists container not found");
  }

  listsContainer.replaceChildren();

  for (const listType of listTypes) {
    const listContainer = document.createElement("div");
    const list = lists.find((l) => l.name === listType);

    listContainer.classList.add("list-item");

    if (!isDefined(list)) {
      const noAssigneeElement = document.createElement("p");
      noAssigneeElement.textContent = `List "${listType}" not found`;
      noAssigneeElement.classList.add("list-item__no-assignee");

      listContainer.appendChild(noAssigneeElement);
      listsContainer.appendChild(listContainer);

      continue;
    }

    const [listSettings, assigneeButton, deleteButton] = await Promise.all([
      getListSettings(trelloContext, list.id),
      buttonComponent({
        trelloContext,
        icon: lucideIcon('user-round-cog'),
        theme: 'secondary',
        callback: (trelloContext: TrelloPowerUpContext, mouseEvent: MouseEvent) => openMemberPicker({
          trelloContext,
          mouseEvent,
          onSelect: async (member) => {
            await setListSettings(trelloContext, list.id, { assigneeId: member.id });
            await requestRender(trelloContext);
          }
        }),
      }),
      buttonComponent({
        trelloContext,
        icon: lucideIcon('x'),
        theme: 'danger',
        callback: async () => {
          await setListSettings(trelloContext, list.id, { assigneeId: null });
          await requestRender(trelloContext);
        },
      }),
    ]);
    const listName = document.createElement("h3");
    const userElement = isDefined(listSettings.assigneeId)
      ? await userFullBadgeComponent({
        trelloContext,
        title: 'Assigned to:',
        userId: listSettings.assigneeId
      })
      : null;

    listContainer.setAttribute("data-list-id", list.id);

    listName.textContent = list.name;
    listName.classList.add("list-item__name");
    listContainer.appendChild(listName);

    if (isDefined(userElement)) {
      listContainer.appendChild(userElement);
    } else {
      const noAssigneeElement = document.createElement("p");

      noAssigneeElement.textContent = "No assignee";
      noAssigneeElement.classList.add("list-item__no-assignee");

      listContainer.appendChild(noAssigneeElement);
    }

    listContainer.appendChild(assigneeButton);

    if (isDefined(userElement)) {
      listContainer.appendChild(deleteButton);
    }

    listsContainer.appendChild(listContainer);
  }
};

const fieldsRender = async (trelloContext: TrelloPowerUpContext) => {
  const prefixInput = document.getElementById("task-number-prefix") as HTMLInputElement;
  const settings = await getBoardSettings(trelloContext);

  prefixInput.value = settings.taskPrefix;
};

const render = async (trelloContext: TrelloPowerUpContext) => {
  await Promise.all([
    connectStyle(styles),
    fieldsRender(trelloContext),
    saveButtonRender(trelloContext),
    listsRender(trelloContext),
  ]);

  trelloContext.sizeTo(rootContainer);
};

const requestRender = (trelloContext: TrelloPowerUpContext): Promise<void> => {
  renderPromise = renderPromise.then(() => render(trelloContext));

  return renderPromise;
};

/**
 * Events
 */

window.addEventListener("resize", () => t.sizeTo(rootContainer));

/**
 * Start flow
 */

t.render(() => requestRender(t));