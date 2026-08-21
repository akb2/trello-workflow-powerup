import { TrelloBadgeColor } from "./trello-badge-color";

export interface TrelloCardBadge {
  text?: string;
  icon?: string;
  color?: TrelloBadgeColor | null;
  monochrome?: boolean;
  refresh?: number;
  dynamic?: () => TrelloCardBadge | Promise<TrelloCardBadge>;
}