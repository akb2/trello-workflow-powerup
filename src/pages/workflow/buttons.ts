import { returnToBacklogHandler } from "../../handlers/return-to-backlog.handler";
import { returnToClarificationHandler } from "../../handlers/return-to-clarification.handler";
import { sendForClarificationHandler } from "../../handlers/send-for-clarification.handler";
import { sendToReadyForDevelopmentHandler } from "../../handlers/send-to-ready-for-development.handler";
import { startDevelopmentHandler } from "../../handlers/start-development.handler";
import { ButtonCondition } from "../../models/button-condition";
import { ListType } from "../../models/list-type";
import { TrelloButton } from "../../models/trello-button";
import { lucideIcon } from "../../utils/lucide-icon";

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
    callback: trelloContext => sendForClarificationHandler(trelloContext),
  },

  /**
   * In Clarifictaion
   */

  {
    theme: "secondary",
    text: "Return in Backlog",
    icon: lucideIcon('graduation-cap'),
    condition: ButtonCondition.Edit,
    listType: ListType.InClarification,
    callback: trelloContext => returnToBacklogHandler(trelloContext),
  },

  {
    theme: "primary",
    text: "Ready for Development",
    icon: lucideIcon('ellipsis'),
    condition: ButtonCondition.Edit,
    listType: ListType.InClarification,
    callback: trelloContext => sendToReadyForDevelopmentHandler(trelloContext),
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
    callback: trelloContext => returnToClarificationHandler(trelloContext),
  },

  {
    theme: "primary",
    text: "Start Development",
    icon: lucideIcon('code-xml'),
    condition: ButtonCondition.Edit,
    listType: ListType.ReadyForDevelopment,
    callback: trelloContext => startDevelopmentHandler(trelloContext),
  },
];