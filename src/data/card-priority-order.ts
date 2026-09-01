import { CardPriority } from "../models/card-priority";

export const CARD_PRIORITY_ORDER: Record<CardPriority, number> = {
  [CardPriority.VeryHigh]: 0,
  [CardPriority.High]: 1,
  [CardPriority.Medium]: 2,
  [CardPriority.Low]: 3,
  [CardPriority.VeryLow]: 4,
};