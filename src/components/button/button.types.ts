import { TrelloButton } from "../../models/trello-button";

export interface ButtonComponentProps extends Pick<TrelloButton, "theme" | "icon" | "callback"> {
  text?: string;
}