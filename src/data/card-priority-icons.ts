import { CardPriority } from "../models/card-priority";
import { lucideIcon } from "../utils/lucide-icon";

export const CARD_PRIORITY_ICONS: Record<CardPriority, string> = {
  [CardPriority.VeryLow]: lucideIcon('chevrons-down'),
  [CardPriority.Low]: lucideIcon('chevron-down'),
  [CardPriority.Medium]: lucideIcon('minus'),
  [CardPriority.High]: lucideIcon('chevron-up'),
  [CardPriority.VeryHigh]: lucideIcon('chevrons-up'),
};