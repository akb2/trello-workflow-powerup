import { TrelloCard } from "../models/trello-card";
import { TrelloMember } from "../models/trello-member";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getAuth } from "./get-auth";
import { setCardSettings } from "./set-card-settings";

export const setCardAssignee = async (t: TrelloPowerUpContext, memberId: TrelloMember['id'] | null, cardId?: TrelloCard['id']) => {
  await getAuth(t);

  await setCardSettings(t, { assigneeId: memberId }, cardId);
};