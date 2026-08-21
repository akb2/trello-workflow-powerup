import { TrelloBadgeColor } from "./trello-badge-color";
import { TrelloPowerUpContext } from "./trello-power-up-context";

export interface TrelloCardDetailBadge {
  title?: string;
  text?: string;
  color?: TrelloBadgeColor;
  url?: string;
  target?: string;
  refresh?: number;
  callback?: (t: TrelloPowerUpContext, opts?: unknown) => void | Promise<unknown>;
  dynamic?: () => TrelloCardDetailBadge | Promise<TrelloCardDetailBadge>;
}