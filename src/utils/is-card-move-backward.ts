import { LIST_TYPE_ORDER } from "../data/list-type-order";
import { ListType } from "../models/list-type";

export const isCardMoveBackward = (beforeListType: ListType, currentListType: ListType): boolean => {
  const beforeListTypeOrder = LIST_TYPE_ORDER.indexOf(beforeListType);
  const currentListTypeOrder = LIST_TYPE_ORDER.indexOf(currentListType);

  return currentListTypeOrder < beforeListTypeOrder;
};