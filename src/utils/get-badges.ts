import { TrelloBadgeColor } from "../models/trello-badge-color";
import { TrelloCardBadge } from "../models/trello-card-badge";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getTaskNumber } from "./get-task-number";
import { lucideIcon } from "./lucide-icon";

export const getBadges = async (t: TrelloPowerUpContext): Promise<TrelloCardBadge[]> => ([
  {
    text: await getTaskNumber(t),
    icon: lucideIcon("hash"),
    color: TrelloBadgeColor.Blue,
  }
]);