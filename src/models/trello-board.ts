import { TrelloMember } from "./trello-member";

export interface TrelloBoard {
  id: string;
  name: string;
  members: TrelloMember[];
}