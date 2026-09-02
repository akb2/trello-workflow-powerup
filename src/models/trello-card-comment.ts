import type { TrelloCard } from "./trello-card";

export interface TrelloCardComment {
  id: string;
  idMemberCreator: string;
  type: "commentCard";
  date: string;
  data: {
    text: string;
    card: Pick<TrelloCard, "id" | "name">;
  };
}