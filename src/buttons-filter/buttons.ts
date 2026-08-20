import { ButtonCondition } from "../models/button-condition";
import { ListType } from "../models/list-type";
import { TrelloButton } from "../models/trello-button";
import { startDevelopmentHandler } from "../utils/start-development-handler";

export const BUTTONS: TrelloButton[] = [
  /**
   * Ready for Development
   */

  {
    text: "Start Development",
    condition: ButtonCondition.Edit,
    listType: ListType.ReadyForDevelopment,
    callback: startDevelopmentHandler.bind(null),
  }
];