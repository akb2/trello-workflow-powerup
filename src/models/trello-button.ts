import { ButtonCondition } from "./button-condition";
import { CardType } from "./card-type";
import { ListType } from "./list-type";
import { TrelloPowerUpContext } from "./trello-power-up-context";

export interface TrelloButton {
  icon?: string;
  text: string;
  condition: ButtonCondition;
  callback?: (t: TrelloPowerUpContext, event: MouseEvent) => void | Promise<unknown>;
  listTypes?: ListType[];
  cardTypes?: { [key in CardType]?: ListType[] };
  theme?: "primary" | "secondary" | "danger";
}