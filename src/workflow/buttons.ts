import { ButtonCondition } from "../models/button-condition";
import { ListType } from "../models/list-type";
import { TrelloButton } from "../models/trello-button";
import { lucideIcon } from "../utils/lucide-icon";
import { startDevelopmentHandler } from "../utils/start-development-handler";

export const BUTTONS: TrelloButton[] = [
  /**
   * Ready for Development
   */

  {
    theme: "primary",
    text: "Start Development",
    icon: lucideIcon('code-xml'),
    condition: ButtonCondition.Edit,
    listType: ListType.ReadyForDevelopment,
    callback: startDevelopmentHandler.bind(null),
  }
];