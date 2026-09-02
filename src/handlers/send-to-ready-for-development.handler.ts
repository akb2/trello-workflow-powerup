import { ListType } from "../models/list-type";
import { TrelloCard } from "../models/trello-card";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { assignToColumnsAssignee } from "../utils/assing-to-columns-assignee";
import { moveCardToList } from "../utils/move-card-to-list";
import { readyForDevelopmentValidator } from "../validators/ready-for-development.validator";

export const sendToReadyForDevelopmentHandler = async (trelloContext: TrelloPowerUpContext, optionalCard?: TrelloCard) => {
  const card = optionalCard ?? await trelloContext.card("id");
  const isValid = await readyForDevelopmentValidator(trelloContext, card);

  if (isValid) {
    await Promise.all([
      moveCardToList(trelloContext, card, ListType.ReadyForDevelopment),
      assignToColumnsAssignee(trelloContext, ListType.ReadyForDevelopment, false),
    ]);
  }
};