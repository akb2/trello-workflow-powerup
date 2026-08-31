import { NotDefinable } from "@akb2/types-tools";
import { CardType } from "./card-type";
import { TrelloPowerUpContext } from "./trello-power-up-context";

export interface OpenTypePickerOptions {
  trelloContext: TrelloPowerUpContext;
  selectedType?: NotDefinable<CardType>;
  mouseEvent?: MouseEvent;
  onSelect: (type: CardType) => void | Promise<void>;
}