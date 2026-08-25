import { TrelloMember } from "../../models/trello-member";
import { TrelloPowerUpContext } from "../../models/trello-power-up-context";

export interface UserFullBadgeComponentProps {
  trelloContext: TrelloPowerUpContext;
  title: string;
  userId: TrelloMember['id'];
}