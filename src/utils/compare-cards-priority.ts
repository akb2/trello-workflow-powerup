import { anyToInt } from "@akb2/types-tools";
import { SortableCard } from "../models/sortable-card";

export const compareCardsPriority = (a: SortableCard, b: SortableCard): number => {
  if (a.priority !== b.priority) {
    return a.priority - b.priority;
  }

  const aDue = anyToInt(a.card.due) > 0
    ? new Date(a.card.due).getTime()
    : Number.POSITIVE_INFINITY;

  const bDue = anyToInt(b.card.due) > 0
    ? new Date(b.card.due).getTime()
    : Number.POSITIVE_INFINITY;

  if (aDue !== bDue) {
    return aDue - bDue;
  }

  return a.manualIndex - b.manualIndex;
};