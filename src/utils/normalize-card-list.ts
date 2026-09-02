import { isDefined } from "@akb2/types-tools";
import { ListType } from "../models/list-type";
import { TrelloCard } from "../models/trello-card";
import { TrelloCardUpdateAction } from "../models/trello-card-update-action";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { detectListValidator } from "../validators/detect-list.validator";
import { moveCardToList } from "./move-card-to-list";

export const normalizeCardList = async (t: TrelloPowerUpContext, card: TrelloCard, action: TrelloCardUpdateAction): Promise<TrelloCard> => {
  const { listBefore, listAfter } = action.data;

  if (!isDefined(listBefore) || !isDefined(listAfter)) {
    return card;
  }

  const beforeListType = Object.values(ListType).find((type) => type === listBefore.name);

  if (!isDefined(beforeListType)) {
    throw new Error(`Unknown list "${listBefore.name}"`);
  }

  const isValid = await detectListValidator(t, card, beforeListType);

  if (isValid) {
    return card;
  }

  await moveCardToList(t, card, beforeListType);

  return { ...card, idList: listBefore.id };
};