import { NotDefinable } from "@akb2/types-tools";
import { CardPriority } from "./card-priority";
import { TrelloPowerUpContext } from "./trello-power-up-context";

export interface OpenPriorityPickerOptions {
  trelloContext: TrelloPowerUpContext;
  selectedPriority?: NotDefinable<CardPriority>;
  mouseEvent?: MouseEvent;
  onSelect: (priority: CardPriority) => void | Promise<void>;
}