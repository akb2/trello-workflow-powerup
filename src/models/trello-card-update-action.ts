import { Nullable } from "@akb2/types-tools";
import { TrelloCard } from "./trello-card";
import { TrelloList } from "./trello-list";

export interface TrelloCardUpdateAction {
  id: string;
  idMemberCreator: string;
  type: "updateCard";
  date: string;
  appCreator: Nullable<{
    id: string;
    authType: string;
  }>;
  data: {
    card: Pick<TrelloCard, "id" | "name"> & Partial<TrelloCard>;
    old?: Partial<Pick<TrelloCard, "idList" | "pos">>;
    list?: TrelloList;
    listBefore?: TrelloList;
    listAfter?: TrelloList;
  };
}