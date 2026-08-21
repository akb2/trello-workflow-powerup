import { isDefined } from "@akb2/types-tools";
import { APP_OPTIONS } from "../../data/app-settings";
import { checkButtonCondition } from "../../utils/check-button-condition";
import { getCardAssignee } from "../../utils/get-card-assignee";
import { getMemberAvatarUrl } from "../../utils/get-member-avatar-url";
import { lucideIcon } from "../../utils/lucide-icon";
import { setCardAssignee } from "../../utils/set-card-assignee";
import { BUTTONS } from "./buttons";
import { CHECKING_INTERVAL, NO_BUTTONS_NOTIFICATION } from "./data";

const t = window.TrelloPowerUp.iframe(APP_OPTIONS);
const rootContainer = document.getElementById("root-container");
let currentListId: string | undefined;

if (!isDefined(rootContainer)) {
  throw new Error("Root container not found");
}

const renderButtons = async (): Promise<boolean> => {
  const card = await t.card("idList");
  const lists = await t.lists("id", "name");
  const list = lists.find(({ id }) => id === card.idList);
  const actionsContainer = document.createElement("div");

  if (!list) {
    return false;
  }

  let renderedButtonsCount = 0;

  for (const { listType, callback, text, icon, condition, theme } of BUTTONS) {
    if (checkButtonCondition(t, condition) && (!isDefined(listType) || listType === list.name)) {
      const button = document.createElement("button");

      if (isDefined(icon)) {
        const iconElement = document.createElement("span");
        iconElement.style.maskImage = `url(${icon})`;
        iconElement.style.webkitMaskImage = `url(${icon})`;
        iconElement.classList.add("button__icon");
        button.appendChild(iconElement);
      }

      if (isDefined(theme)) {
        button.classList.add(`theme-${theme}`);
      }

      button.classList.add("button");
      button.appendChild(document.createTextNode(text ?? "Default Button"));
      button.addEventListener('click', () => {
        callback?.(t);

      });

      actionsContainer.appendChild(button);
      renderedButtonsCount++;
    }
  }

  if (renderedButtonsCount > 0) {
    rootContainer.appendChild(actionsContainer);

    return true;
  }

  return false;
};

const renderAssignee = async (): Promise<boolean> => {
  const assignee = await getCardAssignee(t);

  if (isDefined(assignee)) {
    const avatar = getMemberAvatarUrl(assignee);

    const assigneeElement = document.createElement("div");
    const assigneeTitleElement = document.createElement("span");
    const assigneeNameElement = document.createElement("span");
    const assigneeDeleteButtonElement = document.createElement("button");
    const assigneeDeleteButtonIconElement = document.createElement("span");
    const avatarElement = document.createElement("img");

    assigneeElement.classList.add("assignee");

    assigneeTitleElement.textContent = "Assignee to:";
    assigneeTitleElement.classList.add("assignee__title");

    assigneeNameElement.textContent = assignee.fullName;
    assigneeNameElement.classList.add("assignee__name");

    assigneeDeleteButtonElement.classList.add("assignee__delete-button");
    assigneeDeleteButtonElement.classList.add("button");
    assigneeDeleteButtonElement.classList.add("theme-danger");
    assigneeDeleteButtonElement.classList.add("type-icon");
    assigneeDeleteButtonElement.addEventListener('click', async () => {
      setCardAssignee(t, null);
      await render();
    });

    assigneeDeleteButtonIconElement.classList.add("button__icon");
    assigneeDeleteButtonIconElement.style.maskImage = `url(${lucideIcon('x')})`;
    assigneeDeleteButtonIconElement.style.webkitMaskImage = `url(${lucideIcon('x')})`;

    avatarElement.alt = assignee.fullName;
    avatarElement.src = avatar ? avatar : lucideIcon('user-round');
    avatarElement.classList.add(avatar ? "assignee__image" : "assignee__icon");

    assigneeDeleteButtonElement.appendChild(assigneeDeleteButtonIconElement);
    assigneeElement.appendChild(avatarElement);
    assigneeElement.appendChild(assigneeTitleElement);
    assigneeElement.appendChild(assigneeNameElement);
    assigneeElement.appendChild(assigneeDeleteButtonElement);
    rootContainer.appendChild(assigneeElement);

    return true;
  }

  return false;
};

const renderNotification = () => {
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.textContent = NO_BUTTONS_NOTIFICATION;
  rootContainer.appendChild(notification);
};

const render = async () => {
  const card = await t.card("idList");

  currentListId = card.idList;
  rootContainer.replaceChildren();

  const hasAssignee = await renderAssignee();
  const hasButtons = await renderButtons();
  const hasContent = hasAssignee || hasButtons;

  if (!hasContent) {
    renderNotification();
  }

  t.sizeTo(rootContainer);
};

const checkState = async (): Promise<void> => {
  const card = await t.card("idList");

  if (card.idList === currentListId) {
    return;
  }

  await render();
};

const interval = window.setInterval(checkState, CHECKING_INTERVAL);

t.render(render);

window.addEventListener("resize", () => t.sizeTo(rootContainer));
window.addEventListener("beforeunload", () => window.clearInterval(interval));