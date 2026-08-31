import { isDefined } from "@akb2/types-tools";
import { CARD_TYPE_COLORS } from "../../data/card-type-colors";
import { CARD_TYPES_NAMES } from "../../data/card-type-names";
import { TrelloBadgeColor } from "../../models/trello-badge-color";
import { TrelloCardDetailBadge } from "../../models/trello-card-detail-badge";
import { TrelloPowerUpContext } from "../../models/trello-power-up-context";
import { getCardSettings } from "../../utils/get-card-settings";
import { getTaskNumber } from "../../utils/get-task-number";

export const cardDetailBadgesConnector = async (t: TrelloPowerUpContext): Promise<TrelloCardDetailBadge[]> => {
  const badges: TrelloCardDetailBadge[] = [];
  const [taskNumber, { type }] = await Promise.all([
    getTaskNumber(t),
    getCardSettings(t),
  ]);

  badges.push({
    text: `Task: ${taskNumber}`,
    color: TrelloBadgeColor.Blue,
  });

  if (isDefined(type)) {
    badges.push({
      text: `Type: ${CARD_TYPES_NAMES[type]}`,
      color: CARD_TYPE_COLORS[type],
    });
  }

  return badges;
};