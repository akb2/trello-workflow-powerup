import { isDefined } from "@akb2/types-tools";
import { APP_OPTIONS } from "../../data/app-settings";
import { checkButtonCondition } from "../../utils/check-button-condition";
import { getCardAssignee } from "../../utils/get-card-assignee";
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

  currentListId = card.idList;

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

      rootContainer.appendChild(button);
      renderedButtonsCount++;
    }
  }

  return renderedButtonsCount > 0;
};

const renderAssignee = async (): Promise<boolean> => {
  const assignee = await getCardAssignee(t);

  if (assignee) {
    const assigneeElement = document.createElement("div");
    const assigneeTitleElement = document.createElement("span");
    const assigneeNameElement = document.createElement("span");
    const assigneeDeleteButtonElement = document.createElement("button");
    const assigneeDeleteButtonIconElement = document.createElement("span");
    let avatarElement;

    assigneeElement.classList.add("assignee");

    assigneeTitleElement.textContent = "Assignee to:";
    assigneeTitleElement.classList.add("assignee__title");

    assigneeNameElement.textContent = assignee.fullName;
    assigneeNameElement.classList.add("assignee__name");

    assigneeDeleteButtonElement.classList.add("assignee__delete-button");
    assigneeDeleteButtonElement.classList.add("button");
    assigneeDeleteButtonElement.classList.add("theme-danger");
    assigneeDeleteButtonElement.addEventListener('click', setCardAssignee.bind(null, t, null));

    assigneeDeleteButtonIconElement.classList.add("button__icon");
    assigneeDeleteButtonIconElement.style.maskImage = `url(${lucideIcon('x')})`;
    assigneeDeleteButtonIconElement.style.webkitMaskImage = `url(${lucideIcon('x')})`;

    if (isDefined(assignee.avatarUrl)) {
      avatarElement = document.createElement("img");
      avatarElement.src = assignee.avatarUrl;
      avatarElement.alt = assignee.fullName;
      avatarElement.classList.add("assignee__avatar");
    } else {
      avatarElement = document.createElement("span");
      avatarElement.style.maskImage = `url(${lucideIcon('user-round')})`;
      avatarElement.style.webkitMaskImage = `url(${lucideIcon('user-round')})`;
      avatarElement.classList.add("assignee__icon");
    }

    assigneeDeleteButtonElement.appendChild(assigneeDeleteButtonIconElement);
    assigneeElement.appendChild(avatarElement);
    assigneeElement.appendChild(assigneeTitleElement);
    assigneeElement.appendChild(assigneeNameElement);
    assigneeElement.appendChild(assigneeDeleteButtonElement);
    rootContainer.appendChild(assigneeElement);
  } else {
  }

  return true;
};

const renderNotification = () => {
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.textContent = NO_BUTTONS_NOTIFICATION;
  rootContainer.appendChild(notification);
};

const render = async () => {
  rootContainer.replaceChildren();

  const hasContent = (
    await renderAssignee()
    || await renderButtons()
  );

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