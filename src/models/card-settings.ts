import { TrelloBoard } from "./trello-board";
import { TrelloMember } from "./trello-member";

export interface CardSettings {
  initializedBoardId?: TrelloBoard['id'];
  assigneeId: TrelloMember['id'] | null;
}