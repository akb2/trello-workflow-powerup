import { isDefined } from "@akb2/types-tools";
import { APP_OPTIONS } from "../../data/app-settings";
import { checkButtonCondition } from "../../utils/check-button-condition";
import { BUTTONS } from "./buttons";

const t = window.TrelloPowerUp.iframe(APP_OPTIONS);
const list = await t.list("name");
const rootContainer = document.getElementById("root-container");

if (!isDefined(rootContainer)) {
  throw new Error("Root container not found");
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
    button.addEventListener('click', () => callback?.(t));
    button.appendChild(document.createTextNode(text ?? "Default Button"));

    rootContainer.appendChild(button);
  }
}

t.sizeTo(rootContainer);

window.addEventListener("resize", () => t.sizeTo(rootContainer));

export { };
