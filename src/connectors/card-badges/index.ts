import { isDefined } from "@akb2/types-tools";
import { TrelloBadgeColor } from "../../models/trello-badge-color";
import { TrelloCardBadge } from "../../models/trello-card-badge";
import { TrelloPowerUpContext } from "../../models/trello-power-up-context";
import { getCardAssignee } from "../../utils/get-card-assignee";
import { getCardSettings } from "../../utils/get-card-settings";
import { getMemberAvatarUrl } from "../../utils/get-member-avatar-url";
import { getTaskNumber } from "../../utils/get-task-number";
import { lucideIcon } from "../../utils/lucide-icon";

export const cardBadgesConnector = async (t: TrelloPowerUpContext): Promise<TrelloCardBadge[]> => {
  const badges: TrelloCardBadge[] = [];
  const [taskNumber, assignee, { type }] = await Promise.all([
    getTaskNumber(t),
    getCardAssignee(t),
    getCardSettings(t),
  ]);

  if (assignee) {
    const avatarUrl = getMemberAvatarUrl(assignee);

    badges.push({
      icon: avatarUrl ?? lucideIcon("user-round"),
      text: assignee.fullName,
      color: null,
      monochrome: !avatarUrl,
    });
  }

  if (isDefined(type)) {
    badges.push({
      text: type,
      icon: lucideIcon("tag"),
      color: TrelloBadgeColor.Green,
    });
  }

  badges.push({
    text: taskNumber,
    icon: lucideIcon("hash"),
    color: TrelloBadgeColor.Blue,
  });

  return badges;
};