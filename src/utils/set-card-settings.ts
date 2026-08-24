import { CARD_SETTINGS_KEY } from "../data/card-settings";
import { CardSettings } from "../models/card-settings";
import { TrelloCard } from "../models/trello-card";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { TrelloPowerUpDataScope } from "../models/trello-power-up-data-scope";
import { TrelloPowerUpDataVisibility } from "../models/trello-power-up-data-visibility";
import { getCardSettings } from "./get-card-settings";

export const setCardSettings = async (
  t: TrelloPowerUpContext,
  newSettings: Partial<CardSettings>,
  cardId?: TrelloCard["id"],
): Promise<void> => t.set(
  cardId ?? TrelloPowerUpDataScope.Card,
  TrelloPowerUpDataVisibility.Shared,
  CARD_SETTINGS_KEY,
  {
    ...await getCardSettings(t, cardId),
    ...newSettings,
  },
);