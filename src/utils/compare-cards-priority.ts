import { anyToInt } from "@akb2/types-tools";
import { SortableCard } from "../models/sortable-card";

export const compareCardsPriority = (a: SortableCard, b: SortableCard): number => {
  if (a.priority !== b.priority) {
    return a.priority - b.priority;
  }

  const aCardDue = anyToInt(a.card.due);
  const bCardDue = anyToInt(b.card.due);
  const aDue = aCardDue > 0
    ? new Date(aCardDue).getTime()
    : Number.POSITIVE_INFINITY;
  const bDue = bCardDue > 0
    ? new Date(bCardDue).getTime()
    : Number.POSITIVE_INFINITY;

  if (aDue !== bDue) {
    return aDue - bDue;
  }

  return a.manualIndex - b.manualIndex;
};