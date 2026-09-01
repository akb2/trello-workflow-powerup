import { CardPriority } from "../models/card-priority";

export const CARD_PRIORITY_NAMES: Record<CardPriority, string> = {
  [CardPriority.VeryLow]: "Very Low",
  [CardPriority.Low]: "Low",
  [CardPriority.Medium]: "Medium",
  [CardPriority.High]: "High",
  [CardPriority.VeryHigh]: "Very High",
};