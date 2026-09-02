import { ListType } from "../models/list-type";
import { TrelloCard } from "../models/trello-card";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { assignToColumnsAssignee } from "../utils/assing-to-columns-assignee";
import { getCard } from "../utils/get-card";
import { moveCardToList } from "../utils/move-card-to-list";
import { returnCardByWorkflowValidator } from "../validators/return-card-by-workflow.validator";

export const returnToClarificationHandler = async (trelloContext: TrelloPowerUpContext, optionalCard?: TrelloCard) => {
  const card = optionalCard ?? await getCard(trelloContext);
  const isValid = await returnCardByWorkflowValidator(trelloContext, card);

  if (isValid) {
    await Promise.all([
      moveCardToList(trelloContext, card, ListType.InClarification),
      assignToColumnsAssignee(trelloContext, ListType.InClarification, false)
    ]);
  }
}