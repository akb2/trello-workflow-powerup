import { SortableCard } from "../models/sortable-card";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getAuth } from "./get-auth";
import { sortCards } from "./sort-cards";

export const normalizeCardsOrder = async (
  t: TrelloPowerUpContext,
): Promise<void> => {
  const [cards, lists, auth] = await Promise.all([
    t.cards("id", "idList", "due", "pos"),
    t.lists("id"),
    getAuth(t),
  ]);

  for (const list of lists) {
    const listCards = cards
      .filter(({ idList }) => idList === list.id)
      .sort((a, b) => a.pos - b.pos);

    if (listCards.length < 2) {
      continue;
    }

    const sortedCards = await sortCards(t, listCards);
    const orderChangedCards: { card: SortableCard['card']; index: number; }[] = [];

    sortedCards.forEach((card, index) => {
      if (card.id !== listCards[index].id) {
        orderChangedCards.push({
          card,
          index,
        });
      }
    });

    if (orderChangedCards.length === 0) {
      continue;
    }

    await Promise.all(
      orderChangedCards.map(async ({ card, index }) => {
        const params = new URLSearchParams({
          ...Object.fromEntries(auth),
          pos: String(listCards[index].pos),
        });

        const response = await fetch(
          `https://api.trello.com/1/cards/${card.id}?${params}`,
          {
            method: "PUT",
          },
        );

        if (!response.ok) {
          throw new Error(
            `Failed to reorder card "${card.id}"`,
          );
        }
      }),
    );
  }
};