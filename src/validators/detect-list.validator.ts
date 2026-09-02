import { isDefined, NotDefinable } from "@akb2/types-tools";
import { ALERT_DURATION_IN_SECONDS } from "../data/alert-durations-in-seconds";
import { sendToInCodeReviewHandler } from "../handlers/send-to-in-code-review.handler";
import { sendToStartDevelopmentHandler } from "../handlers/send-to-start-development.handler";
import { ListType } from "../models/list-type";
import { TrelloCard } from "../models/trello-card";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getCards } from "../utils/get-cards";
import { getLists } from "../utils/get-lists";
import { isCardMoveBackward } from "../utils/is-card-move-backward";
import { doneValidator } from "./done.validator";
import { readyForDevelopmentValidator } from "./ready-for-development.validator";
import { returnCardByWorkflowValidator } from "./return-card-by-workflow.validator";

export function detectListValidator(trelloContext: TrelloPowerUpContext, card: TrelloCard, beforeListType?: ListType): Promise<boolean>;
export function detectListValidator(trelloContext: TrelloPowerUpContext, cardId: TrelloCard['id'], beforeListType?: ListType): Promise<boolean>;
export async function detectListValidator(trelloContext: TrelloPowerUpContext, cardOrId: TrelloCard | TrelloCard['id'], beforeListType?: ListType): Promise<boolean> {
  let card: NotDefinable<TrelloCard>;

  if (typeof cardOrId === "string") {
    const cards = await getCards(trelloContext);

    card = cards.find(c => c.id === cardOrId);
  } else {
    card = cardOrId;
  }

  if (!isDefined(card)) {
    throw new Error("Card not found");
  }

  const listId = card.idList;
  const lists = await getLists(trelloContext);
  const list = lists.find(l => l.id === listId);

  if (!list?.name?.length) {
    throw new Error("List name not found");
  }

  const listType = Object.values(ListType).find(type => type === list.name);

  if (!isDefined(listType)) {
    throw new Error("List type not found");
  }

  // List has not changed
  if (beforeListType === listType) {
    trelloContext.alert({ message: `${card.name}: The card is still in the same list.`, duration: ALERT_DURATION_IN_SECONDS });

    return true;
  }

  // Card has moved backward in the workflow
  if (isDefined(beforeListType) && isCardMoveBackward(beforeListType, listType)) {
    return returnCardByWorkflowValidator(trelloContext, card);
  }

  // Card has moved forward in the workflow
  switch (listType) {
    case ListType.BackLog:
      return true;
    case ListType.InClarification:
      return true;
    case ListType.ReadyForDevelopment:
      return readyForDevelopmentValidator(trelloContext, card);
    case ListType.InDevelopment:
      await sendToStartDevelopmentHandler(trelloContext, card);
    case ListType.InCodeReview:
      await sendToInCodeReviewHandler(trelloContext, card);
    case ListType.ReadyForTesting:
    case ListType.InTesting:
    case ListType.ReadyForRelease:
      return true;
    case ListType.Done:
      return doneValidator(trelloContext, card);
    default:
      return false;
  }
}