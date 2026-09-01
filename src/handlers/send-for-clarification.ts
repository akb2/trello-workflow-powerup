import { ListType } from "../models/list-type";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getCardSettings } from "../utils/get-card-settings";
import { getListSettingsByType } from "../utils/get-list-settings-by-type";
import { moveCardToList } from "../utils/move-card-to-list";
import { setCardAssignee } from "../utils/set-card-assignee";

export const sendForClarificationHandler = async (t: TrelloPowerUpContext): Promise<void> => {
  const [card, { assigneeId }, { assigneeId: defaultAssigneeId }] = await Promise.all([
    t.card("id"),
    getCardSettings(t),
    getListSettingsByType(t, ListType.InClarification),
  ]);

  await Promise.all([
    moveCardToList(t, card, ListType.InClarification),
    setCardAssignee(t, defaultAssigneeId ?? assigneeId),
  ]);
};