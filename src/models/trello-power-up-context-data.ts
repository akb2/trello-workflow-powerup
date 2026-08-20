import { TrelloPermission } from "./trello-permission";

export interface TrelloPowerUpContextData {
  board?: string;
  card?: string;
  member: string;
  permissions: {
    board?: TrelloPermission;
    card?: TrelloPermission;
    organization?: TrelloPermission;
  };
}