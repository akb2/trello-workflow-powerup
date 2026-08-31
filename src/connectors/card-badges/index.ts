import { isDefined } from "@akb2/types-tools";
import { CARD_TYPE_COLORS } from "../../data/card-type-colors";
import { CARD_TYPES_ICONS } from "../../data/card-type-icons";
import { CARD_TYPES_NAMES } from "../../data/card-type-names";
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

  badges.push({
    text: taskNumber,
    icon: lucideIcon("hash"),
    color: TrelloBadgeColor.Blue,
  });

  if (isDefined(type)) {
    badges.push({
      text: CARD_TYPES_NAMES[type],
      icon: CARD_TYPES_ICONS[type],
      color: CARD_TYPE_COLORS[type],
    });
  }

  if (assignee) {
    const avatarUrl = getMemberAvatarUrl(assignee);

    badges.push({
      icon: avatarUrl ?? lucideIcon("user-round"),
      text: assignee.fullName,
      color: null,
      monochrome: !avatarUrl,
    });
  }

  return badges;
};