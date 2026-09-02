import { TrelloCard } from "./trello-card";
import { TrelloList } from "./trello-list";

export interface TrelloCardUpdateAction {
  id: string;
  idMemberCreator: string;
  type: "updateCard";
  date: string;
  data: {
    card: Pick<TrelloCard, "id" | "name"> & Partial<TrelloCard>;
    old?: Partial<Pick<TrelloCard, "idList" | "pos">>;
    list?: TrelloList;
    listBefore?: TrelloList;
    listAfter?: TrelloList;
  };
}