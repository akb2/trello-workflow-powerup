import { TrelloCardBackSectionAction } from "./trello-card-back-section-action";
import { TrelloCardBackSectionContent } from "./trello-card-back-section-content";

export interface TrelloCardBackSection {
  title: string;
  /**
   * URL иконки. Для card-back-section Trello требует серую иконку.
   */
  icon: string;
  content: TrelloCardBackSectionContent;
  action?: TrelloCardBackSectionAction;
}