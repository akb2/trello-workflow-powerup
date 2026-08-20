import { isDefined } from "@akb2/types-tools";
import { APP_OPTIONS } from "../../data/app-settings";
import { checkButtonCondition } from "../../utils/check-button-condition";
import { BUTTONS } from "./buttons";

const t = window.TrelloPowerUp.iframe(APP_OPTIONS);
const rootContainer = document.getElementById("root-container");
let currentListId: string | undefined;

if (!isDefined(rootContainer)) {
  throw new Error("Root container not found");
}

const renderButtons = async () => {
  const card = await t.card("idList");
  const lists = await t.lists("id", "name");
  const list = lists.find(({ id }) => id === card.idList);

  currentListId = card.idList;
  rootContainer.replaceChildren();

  if (!list) {
    return;
  }

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
    }
  }

  t.sizeTo(rootContainer);
};

const checkState = async (): Promise<void> => {
  const card = await t.card("idList");

  if (card.idList === currentListId) {
    return;
  }

  await renderButtons();
};

const interval = window.setInterval(checkState, 1000);

t.render(renderButtons);

window.addEventListener("resize", () => t.sizeTo(rootContainer));
window.addEventListener("beforeunload", () => window.clearInterval(interval));