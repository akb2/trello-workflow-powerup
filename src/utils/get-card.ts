import { isDefined, NotDefinable } from "@akb2/types-tools";
import { TrelloCard } from "../models/trello-card";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getCards } from "./get-cards";

export async function getCard(trelloContext: TrelloPowerUpContext): Promise<TrelloCard>;
export async function getCard(trelloContext: TrelloPowerUpContext, cardId: TrelloCard['id']): Promise<NotDefinable<TrelloCard>>;
export async function getCard(trelloContext: TrelloPowerUpContext, cardId?: TrelloCard['id']): Promise<NotDefinable<TrelloCard>> {
  if (!isDefined(cardId)) {
    return trelloContext.card(
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
  }

  const cards = await getCards(trelloContext);

  return cards.find(c => c.id === cardId);
};