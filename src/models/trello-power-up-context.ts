import { TrelloBoard } from "./trello-board";
import { TrelloCard } from "./trello-card";
import { TrelloList } from "./trello-list";
import { TrelloMember } from "./trello-member";
import { TrelloModelType } from "./trello-model-type";
import { TrelloPopupOptions } from "./trello-popup-options";
import { TrelloPowerUpContextData } from "./trello-power-up-context-data";
import { TrelloPowerUpDataScope } from "./trello-power-up-data-scope";
import { TrelloPowerUpDataVisibility } from "./trello-power-up-data-visibility";
import { TrelloRestApi } from "./trello-rest-api";

export interface TrelloPowerUpContext {
  list(...fields: Array<keyof TrelloList | "all">): Promise<TrelloList>;
  lists(...fields: Array<keyof TrelloList>): Promise<TrelloList[]>;
  card(...fields: Array<keyof TrelloCard | "all">): Promise<TrelloCard>;
  member(...fields: Array<keyof TrelloMember>): Promise<TrelloMember>;
  board<K extends keyof TrelloBoard>(...fields: K[]): Promise<Pick<TrelloBoard, K>>;

  get<T>(
    scope: TrelloPowerUpDataScope,
    visibility: TrelloPowerUpDataVisibility,
    key: string,
    defaultValue?: T,
  ): Promise<T>;

  set<T>(
    scope: TrelloPowerUpDataScope,
    visibility: TrelloPowerUpDataVisibility,
    key: string,
    value: T,
  ): Promise<void>;

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