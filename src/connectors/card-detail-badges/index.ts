import { isDefined, NotDefinable } from "@akb2/types-tools";
import { CARD_PRIORITY_COLORS } from "../../data/card-priority-colors";
import { CARD_PRIORITY_NAMES } from "../../data/card-priority-names";
import { CARD_TYPE_COLORS } from "../../data/card-type-colors";
import { CARD_TYPES_NAMES } from "../../data/card-type-names";
import { CardPriority } from "../../models/card-priority";
import { CardType } from "../../models/card-type";
import { TrelloBadgeColor } from "../../models/trello-badge-color";
import { TrelloCardDetailBadge } from "../../models/trello-card-detail-badge";
import { TrelloPowerUpContext } from "../../models/trello-power-up-context";
import { getCardSettings } from "../../utils/get-card-settings";
import { getTaskNumber } from "../../utils/get-task-number";
import { openPriorityPicker } from "../../utils/open-priority-picker";
import { openTypePicker } from "../../utils/open-type-picker";
import { setCardSettings } from "../../utils/set-card-settings";

export const cardDetailBadgesConnector = async (t: TrelloPowerUpContext): Promise<TrelloCardDetailBadge[]> => {
  const badges: TrelloCardDetailBadge[] = [];
  const [taskNumber, { type, priority }] = await Promise.all([
    getTaskNumber(t),
    getCardSettings(t),
  ]);

  const setType = (selectedType: NotDefinable<CardType>, trelloContext: TrelloPowerUpContext) => openTypePicker({
    trelloContext,
    selectedType,
    onSelect: async type => {
      const { priority } = await getCardSettings(trelloContext);

      setCardSettings(trelloContext, {
        type,
        priority: type === CardType.CriticalIssue ? CardPriority.VeryHigh : priority,
      })
    }
  });

  const setPriority = (selectedPriority: NotDefinable<CardPriority>, trelloContext: TrelloPowerUpContext) => openPriorityPicker({
    trelloContext,
    selectedPriority,
    onSelect: priority => setCardSettings(trelloContext, { priority })
  });

  // ? Task badge
  badges.push({
    text: `Task: ${taskNumber}`,
    color: TrelloBadgeColor.Blue,
  });

  // ? Priority badge
  if (isDefined(type)) {
    badges.push({
      text: `Type: ${CARD_TYPES_NAMES[type]}`,
      color: CARD_TYPE_COLORS[type],
      callback: setType.bind(null, type),
    });
  } else {
    badges.push({
      text: 'Select a type',
      color: TrelloBadgeColor.LightGray,
      callback: setType.bind(null, null),
    });
  }

  // ? Priority badge
  if (isDefined(priority)) {
    badges.push({
      text: `Priority: ${CARD_PRIORITY_NAMES[priority]}`,
      color: CARD_PRIORITY_COLORS[priority],
      callback: setPriority.bind(null, priority),
    });
  } else {
    badges.push({
      text: 'Select a priority',
      color: TrelloBadgeColor.LightGray,
      callback: setPriority.bind(null, null),
    });
  }

  return badges;
};