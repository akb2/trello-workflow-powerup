import { TrelloCard } from "./trello-card";

export interface SortableCard {
  card: Pick<TrelloCard, 'id' | 'due' | 'pos'>;
  priority: number;
  manualIndex: number;
}