import { TrelloPowerUpContext } from "./trello-power-up-context";

export interface TrelloPopupOptions {
  title: string;
  url: string;
  height?: number;

  callback?: (
    t: TrelloPowerUpContext,
    opts?: unknown,
  ) => void | Promise<unknown>;
}