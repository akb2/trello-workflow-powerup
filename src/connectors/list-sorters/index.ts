import { ListSorterOptions } from "../../models/list-sorter-options";
import { TrelloPowerUpContext } from "../../models/trello-power-up-context";
import { sortCards } from "../../utils/sort-cards";

export const listSortersConnector = ({ }: TrelloPowerUpContext) => ([
  {
    text: "Workflow priority",

    callback: async (trelloContext: TrelloPowerUpContext, opts: ListSorterOptions) => {
      const cards = await sortCards(trelloContext, opts.cards);

      return {
        sortedIds: cards.map(({ id }) => id),
      };
    },
  },
]);