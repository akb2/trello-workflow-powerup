import { TrelloCard } from "./trello-card";

export interface SortableCard {
  card: Pick<TrelloCard, 'id' | 'due'>;
  priority: number;
  manualIndex: number;
}