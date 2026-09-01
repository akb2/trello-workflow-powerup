import { CardInListOrderResult } from "./card-in-list-order-result";
import { TrelloAuthorizationStatus } from "./trello-authorization-status";
import { TrelloButton } from "./trello-button";
import { TrelloCardBackSection } from "./trello-card-back-section";
import { TrelloCardBadge } from "./trello-card-badge";
import { TrelloCardDetailBadge } from "./trello-card-detail-badge";
import { TrelloPowerUpContext } from "./trello-power-up-context";

export interface TrelloPowerUpCapabilities {
  "authorization-status"?: (t: TrelloPowerUpContext, opts?: unknown) => TrelloAuthorizationStatus | Promise<TrelloAuthorizationStatus>;
  "show-authorization"?: (t: TrelloPowerUpContext, opts?: unknown) => unknown | Promise<unknown>;
  "board-buttons"?: (t: TrelloPowerUpContext) => Promise<unknown> | unknown;
  "card-buttons"?: (t: TrelloPowerUpContext, opts: unknown) => Array<TrelloButton> | Promise<Array<TrelloButton>>;
  "card-back-section"?: (t: TrelloPowerUpContext, opts?: unknown) => TrelloCardBackSection | Promise<TrelloCardBackSection>;
  "show-settings"?: (t: TrelloPowerUpContext, opts?: unknown) => unknown | Promise<unknown>;
  "card-badges"?: (t: TrelloPowerUpContext, opts?: unknown) => TrelloCardBadge[] | Promise<TrelloCardBadge[]>;
  "card-detail-badges"?: (t: TrelloPowerUpContext, opts?: unknown) => TrelloCardDetailBadge[] | Promise<TrelloCardDetailBadge[]>;
  "list-sorters": (t: TrelloPowerUpContext, opts?: unknown) => CardInListOrderResult[] | Promise<CardInListOrderResult[]>,
}