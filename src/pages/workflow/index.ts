import { isDefined } from "@akb2/types-tools";
import { assigneeFieldComponent } from "../../components/assignee-field/assignee-field";
import { assigneeComponent } from "../../components/assignee/assignee";
import { buttonComponent } from "../../components/button/button";
import { APP_OPTIONS } from "../../data/app-settings";
import { checkButtonCondition } from "../../utils/check-button-condition";
import { getAuth } from "../../utils/get-auth";
import { getLists } from "../../utils/get-lists";
import { lucideIcon } from "../../utils/lucide-icon";
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
  const lists = await getLists(t);
  const list = lists.find(({ id }) => id === card.idList);
  const actionsContainer = document.createElement("div");

  if (!list) {
    return false;
  }

  let renderedButtonsCount = 0;

  for (const { listType, callback, text, icon, condition, theme } of BUTTONS) {
    if (checkButtonCondition(t, condition) && (!isDefined(listType) || listType === list.name)) {
      try {
        actionsContainer.appendChild(await buttonComponent({ icon, theme, callback, text, trelloContext: t }));
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
  const assigneeElement = await assigneeComponent({ trelloContext: t, refreshCallback: requestRender });

  if (isDefined(assigneeElement)) {
    rootContainer.appendChild(assigneeElement);

    return true;
  }

  const assigneeFieldElement = await assigneeFieldComponent({ trelloContext: t, refreshCallback: requestRender });

  if (isDefined(assigneeFieldElement)) {
    rootContainer.appendChild(assigneeFieldElement);

    return true;
  }

  return false;
};

const renderAuthorization = async (): Promise<boolean> => {
  rootContainer.appendChild(await buttonComponent({
    trelloContext: t,
    icon: lucideIcon("key-round"),
    theme: "primary",
    text: "Authorize Power-Up",

    callback: async () => {
      const api = await t.getRestApi();

      await api.authorize({ scope: "read,write", });

      window.location.reload();
    },
  }));

  return true;
}

const renderNotification = () => {
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.textContent = NO_BUTTONS_NOTIFICATION;
  rootContainer.appendChild(notification);
};

const render = async () => {
  const card = await t.card("idList");
  const auth = await getAuth(t);
  let renderedItems: boolean = false;

  currentListId = card.idList;
  rootContainer.replaceChildren();

  if (auth) {
    renderedItems = (await Promise.all([renderAssignee(), renderButtons()])).some(Boolean);
  } else {
    renderedItems = await renderAuthorization();
  }

  if (!renderedItems) {
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