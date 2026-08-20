import { TrelloCard } from "./trello-card";
import { TrelloList } from "./trello-list";
import { TrelloMember } from "./trello-member";
import { TrelloModelType } from "./trello-model-type";
import { TrelloPopupOptions } from "./trello-popup-options";
import { TrelloPowerUpContextData } from "./trello-power-up-context-data";
import { TrelloRestApi } from "./trello-rest-api";

export interface TrelloPowerUpContext {
  list(...fields: Array<keyof TrelloList | "all">): Promise<TrelloList>;
  lists(...fields: Array<keyof TrelloList>): Promise<TrelloList[]>;
  card(...fields: Array<keyof TrelloCard | "all">): Promise<TrelloCard>;
  member(...fields: Array<keyof TrelloMember>): Promise<TrelloMember>;

  getRestApi(): Promise<TrelloRestApi>;
  signUrl(url: string): string;
  getContext(): TrelloPowerUpContextData;

  memberCanWriteToModel(model: TrelloModelType): boolean;
  isMemberSignedIn(): boolean;

  popup(options: TrelloPopupOptions): Promise<unknown>;
  closePopup(): Promise<unknown>;

  render(callback: () => unknown): void;
  sizeTo(target: string | HTMLElement | number): Promise<unknown>;
}