import { isDefined } from "@akb2/types-tools";
import { ALERT_DURATION_IN_SECONDS } from "../data/alert-durations-in-seconds";
import { CardType } from "../models/card-type";
import { ListType } from "../models/list-type";
import { TrelloCard } from "../models/trello-card";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getCardSettings } from "../utils/get-card-settings";
import { getLists } from "../utils/get-lists";
import { isTaskHasContent } from "../utils/is-task-has-content";

const LIST_TYPES_WITH_COMMENT_REQUIRED = [ListType.InClarification, ListType.InCodeReview, ListType.InTesting];

const TYPES_WITHOUT_COMMENT_REQUIRED: { [key in CardType]?: ListType[] } = {
  [CardType.CriticalIssue]: [ListType.InDevelopment, ListType.InCodeReview, ListType.ReadyForTesting],
};

export const doneValidator = async (trelloContext: TrelloPowerUpContext, card: TrelloCard): Promise<boolean> => {
  const [lists, { type }] = await Promise.all([
    getLists(trelloContext),
    getCardSettings(trelloContext, card.id),
  ]);
  const list = lists.find(list => list.id === card.idList);
  const listType = Object.values(ListType).find(type => type === list?.name);

  if (!isDefined(listType)) {
    throw new Error("List type is not defined");
  }

  if (!isDefined(type)) {
    trelloContext.alert({ message: "Card type is not defined", duration: ALERT_DURATION_IN_SECONDS });

    return false;
  }

  if (TYPES_WITHOUT_COMMENT_REQUIRED[type]?.includes(listType)) {
    return true;
  }

  if (LIST_TYPES_WITH_COMMENT_REQUIRED.includes(listType) && !isTaskHasContent(card)) {
    trelloContext.alert({ message: "Comment is required for moving this card to Done", duration: ALERT_DURATION_IN_SECONDS });

    return false;
  }

  return true;
};