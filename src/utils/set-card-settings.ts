import { CARD_SETTINGS_KEY } from "../data/card-settings";
import { CardSettings } from "../models/card-settings";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { TrelloPowerUpDataScope } from "../models/trello-power-up-data-scope";
import { TrelloPowerUpDataVisibility } from "../models/trello-power-up-data-visibility";
import { getCardSettings } from "./get-card-settings";

export const setCardSettings = async (
  t: TrelloPowerUpContext,
  newSettings: Partial<CardSettings>
): Promise<void> => t.set(
  TrelloPowerUpDataScope.Card,
  TrelloPowerUpDataVisibility.Shared,
  CARD_SETTINGS_KEY,
  {
    ...await getCardSettings(t),
    ...newSettings,
  },
);