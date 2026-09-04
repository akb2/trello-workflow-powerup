import { TrelloCard } from "../models/trello-card";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getCards } from "./get-cards";

export const getCardsMap = async (trelloContext: TrelloPowerUpContext): Promise<Map<TrelloCard['id'], TrelloCard>> => {
  const cards = await getCards(trelloContext);

  return new Map(cards.map(card => [card.id, card]));
}