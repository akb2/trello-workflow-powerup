import { ListType } from "../models/list-type";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getCardSettings } from "./get-card-settings";
import { getListSettingsByType } from "./get-list-settings-by-type";
import { setCardAssignee } from "./set-card-assignee";

export const assignToColumnsAssignee = async (trelloContext: TrelloPowerUpContext, listType: ListType, assignToMeForDefault?: boolean): Promise<void> => {
  const [{ assigneeId }, { assigneeId: defaultAssigneeId }] = await Promise.all([
    getCardSettings(trelloContext),
    getListSettingsByType(trelloContext, listType),
  ]);

  await setCardAssignee(trelloContext, defaultAssigneeId ?? (assignToMeForDefault ? assigneeId : null));
};