import { ListType } from "../models/list-type";
import { TrelloCard } from "../models/trello-card";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getCard } from "../utils/get-card";
import { moveCardToList } from "../utils/move-card-to-list";
import { setCardAssignee } from "../utils/set-card-assignee";

export const sendToInCodeReviewHandler = async (trelloContext: TrelloPowerUpContext, optionalCard?: TrelloCard) => {
  const card = optionalCard ?? await getCard(trelloContext);
  const member = await trelloContext.member("id");

  await Promise.all([
    moveCardToList(trelloContext, card, ListType.InCodeReview),
    setCardAssignee(trelloContext, member.id, card.id),
  ]);
};