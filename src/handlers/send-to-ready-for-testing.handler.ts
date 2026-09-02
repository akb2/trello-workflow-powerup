import { ListType } from "../models/list-type";
import { TrelloCard } from "../models/trello-card";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { assignToColumnsAssignee } from "../utils/assing-to-columns-assignee";
import { getCard } from "../utils/get-card";
import { moveCardToList } from "../utils/move-card-to-list";

export const sendToReadyForTestingHandler = async (trelloContext: TrelloPowerUpContext, optionalCard?: TrelloCard) => {
  const card = optionalCard ?? await getCard(trelloContext);

  await Promise.all([
    moveCardToList(trelloContext, card, ListType.ReadyForTesting),
    assignToColumnsAssignee(trelloContext, ListType.ReadyForTesting, false),
  ]);
};