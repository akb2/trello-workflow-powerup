import { ALERT_DURATION_IN_SECONDS } from "../data/alert-durations-in-seconds";
import { TrelloCard } from "../models/trello-card";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { hasCurrentMemberRecentComment } from "../utils/has-current-member-recent-comment";

export const returnCardByWorkflowValidator = async (trelloContext: TrelloPowerUpContext, card: TrelloCard): Promise<boolean> => {
  const hasComment = await hasCurrentMemberRecentComment(trelloContext, card.id);

  if (!hasComment) {
    trelloContext.alert({ message: `${card.name}: You must leave a recent comment before returning this card.`, duration: ALERT_DURATION_IN_SECONDS });

    return false;
  }

  return true;
};