import { ButtonCondition } from "./button-condition";
import { ListType } from "./list-type";
import { TrelloPowerUpContext } from "./trello-power-up-context";

export interface TrelloButton {
  icon?: string;
  text: string;
  condition: ButtonCondition;
  callback?: (
    t: TrelloPowerUpContext,
    opts: unknown,
  ) => void | Promise<unknown>;
  url?: string;
  target?: string;
  listType?: ListType;
}