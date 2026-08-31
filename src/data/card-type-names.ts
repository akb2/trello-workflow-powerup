import { CardType } from "../models/card-type";

export const CARD_TYPES_NAMES: Record<CardType, string> = {
  [CardType.Task]: "Task",
  [CardType.Documentation]: "Documentation",
  [CardType.BugFix]: "Bug Fix",
  [CardType.Feature]: "Feature",
  [CardType.Improvement]: "Improvement",
  [CardType.Refactoring]: "Refactoring",
  [CardType.CriticalIssue]: "Critical Issue"
};