import { isDefined } from "@akb2/types-tools";
import { ListType } from "../models/list-type";
import { TrelloCard } from "../models/trello-card";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getCard } from "../utils/get-card";
import { moveCardToList } from "../utils/move-card-to-list";
import { setCardAssignee } from "../utils/set-card-assignee";

export const sendToInCodeReviewHandler = async (trelloContext: TrelloPowerUpContext, optionalCard?: TrelloCard) => {
  const [card, member] = await Promise.all([
    isDefined(optionalCard) ? Promise.resolve(optionalCard) : getCard(trelloContext),
    trelloContext.member("id")
  ]);

  await Promise.all([
    moveCardToList(trelloContext, card, ListType.InCodeReview),
    setCardAssignee(trelloContext, member.id, card.id),
  ]);
};