import { TrelloCard } from "../models/trello-card";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getAuth } from "./get-auth";
import { getCards } from "./get-cards";
import { sortCards } from "./sort-cards";

export const normalizeCardPosition = async (t: TrelloPowerUpContext, card: TrelloCard): Promise<void> => {
  const [cards, auth] = await Promise.all([
    getCards(t),
    getAuth(t),
  ]);

  const listCards = cards
    .filter(({ idList }) => idList === card.idList)
    .sort((a, b) => a.pos - b.pos);

  if (listCards.length < 2) {
    return;
  }

  const currentIndex = listCards.findIndex(({ id }) => id === card.id);
  const sortedCards = await sortCards(t, listCards);
  const targetIndex = sortedCards.findIndex(({ id }) => id === card.id);

  if (currentIndex === targetIndex) {
    return;
  }

  const previousCard = sortedCards[targetIndex - 1];
  const nextCard = sortedCards[targetIndex + 1];
  const pos = !previousCard
    ? "top"
    : !nextCard
      ? "bottom"
      : String((previousCard.pos + nextCard.pos) / 2);
  const params = new URLSearchParams({ ...Object.fromEntries(auth), pos });

  const response = await fetch(
    `https://api.trello.com/1/cards/${card.id}?${params}`,
    {
      method: "PUT",
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to normalize card "${card.id}" position`,
    );
  }
};