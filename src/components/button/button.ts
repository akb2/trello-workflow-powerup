import { isDefined } from "@akb2/types-tools";
import { TrelloPowerUpContext } from "../../models/trello-power-up-context";
import { connectStyle } from "../../utils/connect-style";
import { ButtonComponentProps } from "./button.types";

export const buttonComponent = ({ callback, icon, text, theme }: ButtonComponentProps, t: TrelloPowerUpContext) => {
  if (!isDefined(text) && !isDefined(icon)) {
    throw new Error("Button must have either text or icon defined");
  }

  connectStyle('src/components/button/button.css');

  const button = document.createElement("button");

  if (isDefined(icon)) {
    const iconElement = document.createElement("span");

    iconElement.style.maskImage = `url(${icon})`;
    iconElement.style.webkitMaskImage = `url(${icon})`;
    iconElement.classList.add("button__icon");

    if (!isDefined(text)) {
      button.classList.add("type-icon");
    }

    button.appendChild(iconElement);
  }

  if (isDefined(theme)) {
    button.classList.add(`theme-${theme}`);
  }

  button.classList.add("button");
  button.appendChild(document.createTextNode(text ?? "Default Button"));
  button.addEventListener('click', () => callback?.(t));

  return button;
};