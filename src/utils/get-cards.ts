import { TrelloCard } from "../models/trello-card";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";

export const getCards = async (trelloContext: TrelloPowerUpContext): Promise<TrelloCard[]> => trelloContext.cards(
  "id",
  "idList",
  "name",
  "due",
  "pos",
  "attachments",
  "badges",
  "desc",
  "idShort",
);