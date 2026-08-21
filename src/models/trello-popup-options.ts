import { TrelloPowerUpContext } from "./trello-power-up-context";

export interface TrelloPopupOptions {
  title: string;
  url?: string;
  height?: number;
  mouseEvent?: MouseEvent;
  items?: Array<{
    text: string;
    icon?: string;
    avatar?: string;
    callback: () => Promise<void>;
  }>;
  search?: {
    count: number;
    placeholder: string;
    empty: string;
  };
  callback?: (
    t: TrelloPowerUpContext,
    opts?: unknown,
  ) => void | Promise<unknown>;
}