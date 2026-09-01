import { CardPriority } from "../models/card-priority";
import { TrelloBadgeColor } from "../models/trello-badge-color";

export const CARD_PRIORITY_COLORS: Record<CardPriority, TrelloBadgeColor> = {
  [CardPriority.VeryLow]: TrelloBadgeColor.Blue,
  [CardPriority.Low]: TrelloBadgeColor.Green,
  [CardPriority.Medium]: TrelloBadgeColor.Yellow,
  [CardPriority.High]: TrelloBadgeColor.Orange,
  [CardPriority.VeryHigh]: TrelloBadgeColor.Red,
};