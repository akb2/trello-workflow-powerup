import { ListSorterOptions } from "./list-sorter-options";
import { TrelloCard } from "./trello-card";
import { TrelloPowerUpContext } from "./trello-power-up-context";

export interface CardInListOrderResult {
  text: string;
  callback: (trelloContext: TrelloPowerUpContext, opts: ListSorterOptions) => Promise<{ sortedIds: TrelloCard['id'][]; }>;
}