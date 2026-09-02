import { ListType } from "../models/list-type";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { moveCardToList } from "../utils/move-card-to-list";
import { setCardAssignee } from "../utils/set-card-assignee";

export const startDevelopmentHandler = async (t: TrelloPowerUpContext) => {
  const card = await t.card("id");
  const member = await t.member("id");

  await moveCardToList(t, card, ListType.InDevelopment);
  await setCardAssignee(t, member.id);
};