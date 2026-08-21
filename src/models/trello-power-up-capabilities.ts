import { TrelloButton } from "./trello-button";
import { TrelloCardBackSection } from "./trello-card-back-section";
import { TrelloCardBadge } from "./trello-card-badge";
import { TrelloCardDetailBadge } from "./trello-card-detail-badge";
import { TrelloPowerUpContext } from "./trello-power-up-context";

export interface TrelloPowerUpCapabilities {
  "card-buttons"?: (t: TrelloPowerUpContext, opts: unknown) => Array<TrelloButton> | Promise<Array<TrelloButton>>;
  "card-back-section"?: (t: TrelloPowerUpContext, opts?: unknown) => TrelloCardBackSection | Promise<TrelloCardBackSection>;
  "show-settings"?: (t: TrelloPowerUpContext, opts?: unknown) => unknown | Promise<unknown>;
  "card-badges"?: (t: TrelloPowerUpContext, opts?: unknown) => TrelloCardBadge[] | Promise<TrelloCardBadge[]>;
  "card-detail-badges"?: (t: TrelloPowerUpContext, opts?: unknown) => TrelloCardDetailBadge[] | Promise<TrelloCardDetailBadge[]>;
}