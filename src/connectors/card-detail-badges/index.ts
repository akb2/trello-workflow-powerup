import { isDefined } from "@akb2/types-tools";
import { CARD_TYPE_COLORS } from "../../data/card-type-colors";
import { CARD_TYPES_NAMES } from "../../data/card-type-names";
import { TrelloBadgeColor } from "../../models/trello-badge-color";
import { TrelloCardDetailBadge } from "../../models/trello-card-detail-badge";
import { TrelloPowerUpContext } from "../../models/trello-power-up-context";
import { getCardSettings } from "../../utils/get-card-settings";
import { getTaskNumber } from "../../utils/get-task-number";
import { openTypePicker } from "../../utils/open-type-picker";
import { setCardSettings } from "../../utils/set-card-settings";

export const cardDetailBadgesConnector = async (t: TrelloPowerUpContext): Promise<TrelloCardDetailBadge[]> => {
  const badges: TrelloCardDetailBadge[] = [];
  const [taskNumber, { type }] = await Promise.all([
    getTaskNumber(t),
    getCardSettings(t),
  ]);

  const setType = (trelloContext: TrelloPowerUpContext) => openTypePicker({
    trelloContext,
    onSelect: type => setCardSettings(trelloContext, { type })
  });

  badges.push({
    text: `Task: ${taskNumber}`,
    color: TrelloBadgeColor.Blue,
  });

  if (isDefined(type)) {
    badges.push({
      text: `Type: ${CARD_TYPES_NAMES[type]}`,
      color: CARD_TYPE_COLORS[type],
      callback: setType,
    });
  } else {
    badges.push({
      text: 'Select a type',
      color: TrelloBadgeColor.Yellow,
      callback: setType,
    });
  }

  return badges;
};