import { CardType } from "../models/card-type";
import { lucideIcon } from "../utils/lucide-icon";

export const CARD_TYPES_ICONS: Record<CardType, string> = {
  [CardType.Task]: lucideIcon('calendar-fold'),
  [CardType.Documentation]: lucideIcon('file-text'),
  [CardType.BugFix]: lucideIcon('bug'),
  [CardType.Feature]: lucideIcon('star'),
  [CardType.Improvement]: lucideIcon('sparkles'),
  [CardType.Refactoring]: lucideIcon('wrench'),
  [CardType.CriticalIssue]: lucideIcon('octagon-x')
};