import { TrelloCard } from "../models/trello-card";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { hasCurrentMemberRecentComment } from "../utils/has-current-member-recent-comment";

export const returnCardByWorkflowValidator = async (trelloContext: TrelloPowerUpContext, card: TrelloCard): Promise<boolean> => {
  const hasComment = await hasCurrentMemberRecentComment(trelloContext, card.id);

  if (!hasComment) {
    trelloContext.alert({ message: `${card.name}: You must leave a recent comment before returning this card.`, duration: 15 });
  }

  return true;
};