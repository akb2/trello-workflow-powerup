import { CardType } from "../models/card-type";
import { TrelloBadgeColor } from "../models/trello-badge-color";

export const CARD_TYPE_COLORS: Record<CardType, TrelloBadgeColor> = {
  [CardType.BugFix]: TrelloBadgeColor.Purple,
  [CardType.Feature]: TrelloBadgeColor.Green,
  [CardType.Improvement]: TrelloBadgeColor.Blue,
  [CardType.Refactoring]: TrelloBadgeColor.Yellow,
  [CardType.CriticalIssue]: TrelloBadgeColor.Red,
};