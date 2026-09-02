import { isDefined, NotDefinable } from "@akb2/types-tools";
import { ListType } from "../models/list-type";
import { TrelloCard } from "../models/trello-card";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getCards } from "../utils/get-cards";
import { getLists } from "../utils/get-lists";
import { isCardMoveBackward } from "../utils/is-card-move-backward";
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

  switch (listType) {
    case ListType.BackLog:
      return true;
    case ListType.InClarification:
      return true;
    case ListType.ReadyForDevelopment: {
      if (isDefined(beforeListType) && isCardMoveBackward(beforeListType, listType)) {
        return returnCardByWorkflowValidator(trelloContext, card);
      }

      return readyForDevelopmentValidator(trelloContext, card);
    }
    case ListType.InDevelopment:
    case ListType.InCodeReview:
    case ListType.ReadyForTesting:
    case ListType.InTesting:
    case ListType.ReadyForRelease:
    case ListType.Done:
    default:
      return false;
  }
}