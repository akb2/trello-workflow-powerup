import { TrelloAuthorizeOptions } from "./trello-authorize-options";

export interface TrelloRestApi {
  isAuthorized(): Promise<boolean>;
  getToken(): Promise<string | null>;
  authorize(options?: TrelloAuthorizeOptions): Promise<string>;
  clearToken(): Promise<void>;
}