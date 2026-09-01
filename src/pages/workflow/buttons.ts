import { sendForClarificationHandler } from "../../handlers/send-for-clarification";
import { ButtonCondition } from "../../models/button-condition";
import { ListType } from "../../models/list-type";
import { TrelloButton } from "../../models/trello-button";
import { lucideIcon } from "../../utils/lucide-icon";
import { startDevelopmentHandler } from "../../utils/start-development-handler";

export const BUTTONS: TrelloButton[] = [
  /**
   * Backlog
   */

  {
    theme: "primary",
    text: "Send for Clarification",
    icon: lucideIcon('text-search'),
    condition: ButtonCondition.Edit,
    listType: ListType.BackLog,
    callback: sendForClarificationHandler.bind(null),
  },

  /**
   * Ready for Development
   */

  {
    theme: "secondary",
    text: "Return for Clarification",
    icon: lucideIcon('square-dashed-text'),
    condition: ButtonCondition.Edit,
    listType: ListType.ReadyForDevelopment,
    callback: sendForClarificationHandler.bind(null),
  },

  {
    theme: "primary",
    text: "Start Development",
    icon: lucideIcon('code-xml'),
    condition: ButtonCondition.Edit,
    listType: ListType.ReadyForDevelopment,
    callback: startDevelopmentHandler.bind(null),
  },
];