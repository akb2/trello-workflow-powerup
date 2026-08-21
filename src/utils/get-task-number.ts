import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getBoardSettings } from "./get-board-settings";

export const getTaskNumber = async (t: TrelloPowerUpContext,): Promise<string> => {
  const card = await t.card("idShort");
  const settings = await getBoardSettings(t);

  return settings.taskPrefix + card.idShort;
};