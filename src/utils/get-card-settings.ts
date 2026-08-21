import { CARD_SETTINGS_KEY, DEFAULT_CARD_SETTINGS } from "../data/card-settings";
import { CardSettings } from "../models/card-settings";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { TrelloPowerUpDataScope } from "../models/trello-power-up-data-scope";
import { TrelloPowerUpDataVisibility } from "../models/trello-power-up-data-visibility";

export const getCardSettings = (t: TrelloPowerUpContext): Promise<CardSettings> => t.get(
  TrelloPowerUpDataScope.Card,
  TrelloPowerUpDataVisibility.Shared,
  CARD_SETTINGS_KEY,
  DEFAULT_CARD_SETTINGS,
);