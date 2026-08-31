import { NotDefinable } from "@akb2/types-tools";
import { CardType } from "./card-type";
import { TrelloBoard } from "./trello-board";
import { TrelloMember } from "./trello-member";

export interface CardSettings {
  initializedBoardId?: TrelloBoard['id'];
  assigneeId: TrelloMember['id'] | null;
  type?: NotDefinable<CardType>
}