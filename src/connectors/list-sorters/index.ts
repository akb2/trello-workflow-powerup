import { CARD_PRIORITY_ORDER } from "../../data/card-priority-order";
import { compareCardsPriority } from "../../data/compare-cards-priority";
import { ListSorterOptions } from "../../models/list-sorter-options";
import { SortableCard } from "../../models/sortable-card";
import { TrelloPowerUpContext } from "../../models/trello-power-up-context";
import { getCardSettings } from "../../utils/get-card-settings";

export const listSortersConnector = ({ }: TrelloPowerUpContext) => ([
  {
    text: "Workflow priority",

    callback: async (trelloContext: TrelloPowerUpContext, opts: ListSorterOptions) => {
      const cards = await Promise.all(
        opts.cards.map(
          async (card, manualIndex): Promise<SortableCard> => {
            const settings = await getCardSettings(trelloContext, card.id);

            return {
              card,
              priority: settings.priority
                ? CARD_PRIORITY_ORDER[settings.priority]
                : Number.POSITIVE_INFINITY,
              manualIndex,
            };
          },
        ),
      );

      cards.sort(compareCardsPriority);

      return {
        sortedIds: cards.map(({ card }) => card.id),
      };
    },
  },
]);