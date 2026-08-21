import { TrelloBadgeColor } from "../models/trello-badge-color";
import { TrelloCardBadge } from "../models/trello-card-badge";
import { getTaskNumber } from "../utils/get-task-number";
import { lucideIcon } from "../utils/lucide-icon";

export const TASK_NUMBER_BADGE: TrelloCardBadge = {
  text: await getTaskNumber(t),
  icon: lucideIcon("hash"),
  color: TrelloBadgeColor.Blue,
};