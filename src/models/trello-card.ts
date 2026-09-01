import { NotDefinable } from "@akb2/types-tools";

export interface TrelloCard {
  id: string;
  idList: string;
  name: string;
  idShort: number;
  due: NotDefinable<number>;
  pos: number;
}