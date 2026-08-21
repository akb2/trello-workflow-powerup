import { TrelloMember } from "./trello-member";

export interface CardSettings {
  assigneeId: TrelloMember['id'] | null;
}