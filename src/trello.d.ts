import { TrelloButton } from "./models/trello-button";
import { TrelloPowerUpContext } from "./models/trello-power-up-context";

interface TrelloPowerUpCapabilities {
  "card-buttons"?: (
    t: TrelloPowerUpContext,
    opts: unknown,
  ) => Array<TrelloButton> | Promise<Array<TrelloButton>>;
}

interface TrelloPowerUpInitializeOptions {
  appKey?: string;
  appName?: string;
  appAuthor?: string;
}

interface TrelloPowerUp {
  initialize(
    capabilities: TrelloPowerUpCapabilities,
    options?: TrelloPowerUpInitializeOptions,
  ): void;
}

declare global {
  interface Window {
    TrelloPowerUp: TrelloPowerUp;
  }
}