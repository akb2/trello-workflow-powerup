import { TrelloMember } from "./trello-member";
import { TrelloPowerUpContext } from "./trello-power-up-context";

export interface OpenMemberPickerOptions {
  trelloContext: TrelloPowerUpContext;
  disabledMemberIds?: string[];
  mouseEvent?: MouseEvent;
  onSelect: (member: TrelloMember) => void | Promise<void>;
}