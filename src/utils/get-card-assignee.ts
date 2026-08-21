import { TrelloMember } from "../models/trello-member";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getBoardMembers } from "./get-board-members";
import { getCardSettings } from "./get-card-settings";

export const getCardAssignee = async (t: TrelloPowerUpContext,): Promise<TrelloMember | null> => {
  const settings = await getCardSettings(t);
  const members = await getBoardMembers(t);

  if (!settings.assigneeId) {
    return null;
  }

  return members.find(({ id }) => id === settings.assigneeId) ?? null;
};