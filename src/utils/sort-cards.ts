import { CARD_PRIORITY_ORDER } from "../data/card-priority-order";
import { SortableCard } from "../models/sortable-card";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { compareCardsPriority } from "./compare-cards-priority";
import { getCardSettings } from "./get-card-settings";

export const sortCards = async (t: TrelloPowerUpContext, cards: SortableCard['card'][]): Promise<SortableCard['card'][]> => {
  const sortableCards = await Promise.all(
    cards.map(async (card, manualIndex): Promise<SortableCard> => {
      const settings = await getCardSettings(t, card.id);

      return {
        card,
        priority: settings.priority
          ? CARD_PRIORITY_ORDER[settings.priority]
          : Number.POSITIVE_INFINITY,
        manualIndex,
      };
    }),
  );

  sortableCards.sort(compareCardsPriority);

  return sortableCards.map(({ card }) => card);
};