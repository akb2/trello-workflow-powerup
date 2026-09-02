import { NotDefinable } from "@akb2/types-tools";

export interface TrelloCard {
  id: string;
  idList: string;
  name: string;
  desc: string;
  idShort: number;
  pos: number;
  due: NotDefinable<number>;
  attachments: unknown[];
  badges: {
    comments: number;
  };
}