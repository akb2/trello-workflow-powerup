import { isDefined } from "@akb2/types-tools";
import { buttonComponent } from "../../components/button/button";
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
let renderPromise = Promise.resolve();

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
      try {
        actionsContainer.appendChild(await buttonComponent({ icon, theme, callback, text }, t));
        renderedButtonsCount++;
      } catch {
      }
    }
  }

  if (renderedButtonsCount > 0) {
    actionsContainer.classList.add("actions");
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
    const avatarElement = document.createElement("img");
    const deleteButton = await buttonComponent({
      icon: lucideIcon('x'),
      theme: 'danger',
      callback: async () => {
        await setCardAssignee(t, null);
        await requestRender();
      }
    }, t);

    assigneeElement.classList.add("assignee");

    assigneeTitleElement.textContent = "Assignee to:";
    assigneeTitleElement.classList.add("assignee__title");

    assigneeNameElement.textContent = assignee.fullName;
    assigneeNameElement.classList.add("assignee__name");

    avatarElement.alt = assignee.fullName;
    avatarElement.src = avatar ? avatar : lucideIcon('user-round');
    avatarElement.classList.add(avatar ? "assignee__image" : "assignee__icon");

    deleteButton.classList.add("assignee__delete-button");

    assigneeElement.appendChild(avatarElement);
    assigneeElement.appendChild(assigneeTitleElement);
    assigneeElement.appendChild(assigneeNameElement);
    assigneeElement.appendChild(deleteButton);
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

const requestRender = (): Promise<void> => {
  renderPromise = renderPromise.then(render);

  return renderPromise;
};

const checkState = async (): Promise<void> => {
  const card = await t.card("idList");

  if (card.idList === currentListId) {
    return;
  }

  await requestRender();
};

const interval = window.setInterval(checkState, CHECKING_INTERVAL);

t.render(requestRender);

window.addEventListener("resize", () => t.sizeTo(rootContainer));
window.addEventListener("beforeunload", () => window.clearInterval(interval));