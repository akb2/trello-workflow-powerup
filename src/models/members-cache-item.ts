import { TrelloMember } from "./trello-member";

export interface MembersCacheItem {
  expiresAt: number;
  promise: Promise<TrelloMember[]>;
}