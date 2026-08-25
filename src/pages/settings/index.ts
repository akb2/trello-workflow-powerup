import { isDefined } from "@akb2/types-tools";
import { assigneeFieldComponent } from "../../components/assignee-field/assignee-field";
import { APP_OPTIONS } from "../../data/app-settings";
import { TrelloModelType } from "../../models/trello-model-type";
import { getBoardSettings } from "../../utils/get-board-settings";
import { getListSettings } from "../../utils/get-list-settings";
import { setBoardSettings } from "../../utils/set-board-settings";

const t = window.TrelloPowerUp.iframe(APP_OPTIONS);
const rootContainer = document.getElementById("root-container");

if (!isDefined(rootContainer)) {
  throw new Error("Root container not found");
}

/**
 * Render's functions
 */

const saveButtonRender = async () => {
  const saveButton = document.getElementById("save-button") as HTMLButtonElement;

  if (!isDefined(saveButton)) {
    throw new Error("Save button not found");
  }

  if (saveButton.hasAttribute("data-rendered")) {
    const settings = await getBoardSettings(t);
    const prefixInput = document.getElementById("task-number-prefix") as HTMLInputElement;

    saveButton.disabled = !t.memberCanWriteToModel(TrelloModelType.Board);
    saveButton.setAttribute("data-rendered", "true");

    saveButton.addEventListener("click", async () => {
      await setBoardSettings(t, {
        ...settings,
        taskPrefix: prefixInput.value.trim(),
      });

      t.closePopup();
    });
  }
};

const listsRender = async () => {
  const listsContainer = document.getElementById("list-assignees-container");
  const lists = await t.lists("id", "name");

  if (!isDefined(listsContainer)) {
    throw new Error("Lists container not found");
  }

  listsContainer.replaceChildren();

  for (const list of lists) {
    const listContainer = document.createElement("div");
    const listName = document.createElement("h3");
    const listSettings = await getListSettings(t, list.id);

    listContainer.classList.add("list-container");
    listContainer.setAttribute("data-list-id", list.id);
    listName.textContent = list.name;

    listContainer.appendChild(listName);

    if (isDefined(listSettings.assigneeId)) {
      listContainer.appendChild(await assigneeFieldComponent({ trelloContext: t, listId: list.id, listName: list.name }));
    }

    listsContainer.appendChild(listContainer);
  }
};

const fieldsRender = async () => {
  const prefixInput = document.getElementById("task-number-prefix") as HTMLInputElement;
  const settings = await getBoardSettings(t);

  prefixInput.value = settings.taskPrefix;
};

const render = async () => {
  await fieldsRender();
  await saveButtonRender();
  await listsRender();

  t.sizeTo(rootContainer);
};

/**
 * Events
 */

window.addEventListener("resize", () => t.sizeTo(rootContainer));

/**
 * Start flow
 */

render();