import { TrelloPowerUpContext } from "./trello-power-up-context";

export interface TrelloCardBackSectionAction {
  text: string;
  callback: (
    t: TrelloPowerUpContext,
    opts?: unknown,
  ) => void | Promise<unknown>;
}