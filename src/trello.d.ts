import { TrelloButton } from "./models/trello-button";
import { TrelloCardBackSection } from "./models/trello-card-back-section";
import { TrelloPowerUpContext } from "./models/trello-power-up-context";

interface TrelloPowerUpCapabilities {
  "card-buttons"?: (t: TrelloPowerUpContext, opts: unknown) => Array<TrelloButton> | Promise<Array<TrelloButton>>;
  "card-back-section"?: (t: TrelloPowerUpContext, opts?: unknown) => TrelloCardBackSection | Promise<TrelloCardBackSection>;
  "show-settings"?: (t: TrelloPowerUpContext, opts?: unknown) => unknown | Promise<unknown>;
}

interface TrelloPowerUpInitializeOptions {
  appKey?: string;
  appName?: string;
  appAuthor?: string;
}

interface TrelloPowerUp {
  initialize(capabilities: TrelloPowerUpCapabilities, options?: TrelloPowerUpInitializeOptions): void;
  iframe(): TrelloPowerUpContext;
}

declare global {
  interface Window {
    TrelloPowerUp: TrelloPowerUp;
  }
}