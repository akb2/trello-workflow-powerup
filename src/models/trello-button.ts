import { ButtonCondition } from "./button-condition";
import { ListType } from "./list-type";
import { TrelloPowerUpContext } from "./trello-power-up-context";

export interface TrelloButton {
  icon?: string;
  text: string;
  condition: ButtonCondition;
  callback?: (t: TrelloPowerUpContext, event: MouseEvent) => void | Promise<unknown>;
  listType?: ListType;
  theme?: "primary" | "secondary" | "danger";
}