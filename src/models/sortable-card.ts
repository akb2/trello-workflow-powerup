import { TrelloCard } from "./trello-card";

export interface SortableCard {
  card: TrelloCard;
  priority: number;
  manualIndex: number;
}