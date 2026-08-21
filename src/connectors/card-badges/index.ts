import { TrelloBadgeColor } from "../../models/trello-badge-color";
import { TrelloCardBadge } from "../../models/trello-card-badge";
import { TrelloPowerUpContext } from "../../models/trello-power-up-context";
import { getCardAssignee } from "../../utils/get-card-assignee";
import { getMemberAvatarUrl } from "../../utils/get-member-avatar-url";
import { getTaskNumber } from "../../utils/get-task-number";
import { lucideIcon } from "../../utils/lucide-icon";

export const cardBadgesConnector = async (t: TrelloPowerUpContext): Promise<TrelloCardBadge[]> => {
  const [taskNumber, assignee] = await Promise.all([
    getTaskNumber(t),
    getCardAssignee(t),
  ]);
  const avatarUrl = assignee
    ? getMemberAvatarUrl(assignee)
    : null;

  return [
    ...(assignee
      ? [{
        text: avatarUrl ? "" : assignee?.fullName,
        icon: avatarUrl ?? lucideIcon("user-round"),
        color: avatarUrl ? TrelloBadgeColor.Blue : TrelloBadgeColor.LightGray,
        monochrome: !avatarUrl,
      }]
      : []
    ),
    {
      text: taskNumber,
      icon: lucideIcon("hash"),
      color: TrelloBadgeColor.Blue,
    }
  ];
};