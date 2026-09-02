import { ListType } from "../models/list-type";
import { TrelloCard } from "../models/trello-card";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { assignToColumnsAssignee } from "../utils/assing-to-columns-assignee";
import { getCard } from "../utils/get-card";
import { moveCardToList } from "../utils/move-card-to-list";
import { doneValidator } from "../validators/done.validator";

export const sendToDoneHandler = async (trelloContext: TrelloPowerUpContext, optionalCard?: TrelloCard): Promise<void> => {
  const card = optionalCard ?? await getCard(trelloContext);
  const isValid = await doneValidator(trelloContext, card);

  if (isValid) {
    await Promise.all([
      moveCardToList(trelloContext, card, ListType.Done),
      assignToColumnsAssignee(trelloContext, ListType.ReadyForDevelopment, false),
    ]);
  }
};