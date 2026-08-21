import { TrelloButton } from "../../models/trello-button";
import { TrelloPowerUpContext } from "../../models/trello-power-up-context";

export interface ButtonComponentProps extends Pick<TrelloButton, "theme" | "icon" | "callback"> {
  trelloContext: TrelloPowerUpContext;
  text?: string;
}