import { TrelloMember } from "./trello-member";

export interface ListSettings {
  assigneeId?: TrelloMember["id"] | null;
}