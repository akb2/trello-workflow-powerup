import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getBoardSettings } from "./get-board-settings";
import { getCard } from "./get-card";

export const getTaskNumber = async (t: TrelloPowerUpContext,): Promise<string> => {
  const [card, settings] = await Promise.all([
    getCard(t),
    getBoardSettings(t),
  ]);

  return settings.taskPrefix + card.idShort;
};