import { TrelloBadgeColor } from "../../models/trello-badge-color";
import { TrelloCardBadge } from "../../models/trello-card-badge";
import { TrelloPowerUpContext } from "../../models/trello-power-up-context";
import { getCardAssignee } from "../../utils/get-card-assignee";
import { getMemberAvatarUrl } from "../../utils/get-member-avatar-url";
import { getTaskNumber } from "../../utils/get-task-number";
import { lucideIcon } from "../../utils/lucide-icon";

export const cardBadgesConnector = async (t: TrelloPowerUpContext): Promise<TrelloCardBadge[]> => {
  const badges: TrelloCardBadge[] = [];
  const [taskNumber, assignee] = await Promise.all([
    getTaskNumber(t),
    getCardAssignee(t),
  ]);

  if (assignee) {
    const avatarUrl = getMemberAvatarUrl(assignee);

    badges.push({
      icon: avatarUrl ?? lucideIcon("user-round"),
      text: assignee.fullName,
      color: null,
      monochrome: !avatarUrl
    });
  }

  badges.push({
    text: taskNumber,
    icon: lucideIcon("hash"),
    color: TrelloBadgeColor.Blue,
  });

  return badges;
};