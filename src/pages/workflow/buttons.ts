import { returnToBacklogHandler } from "../../handlers/return-to-backlog.handler";
import { returnToClarificationHandler } from "../../handlers/return-to-clarification.handler";
import { returnToReadyForDevelopmentHandler } from "../../handlers/return-to-ready-for-development.handler";
import { sendForClarificationHandler } from "../../handlers/send-for-clarification.handler";
import { sendToDoneHandler } from "../../handlers/send-to-done.handler";
import { sendToInCodeReviewHandler } from "../../handlers/send-to-in-code-review.handler";
import { sendToReadyForDevelopmentHandler } from "../../handlers/send-to-ready-for-development.handler";
import { sendToReadyForTestingHandler } from "../../handlers/send-to-ready-for-testing.handler";
import { sendToStartDevelopmentHandler } from "../../handlers/send-to-start-development.handler";
import { ButtonCondition } from "../../models/button-condition";
import { CardType } from "../../models/card-type";
import { ListType } from "../../models/list-type";
import { TrelloButton } from "../../models/trello-button";
import { lucideIcon } from "../../utils/lucide-icon";

const RETURN_FOR_CLARIFICATION_BUTTON: TrelloButton = {
  theme: "secondary",
  text: "Return for Clarification",
  icon: lucideIcon('square-dashed-text'),
  condition: ButtonCondition.Edit,
  listTypes: [
    ListType.ReadyForDevelopment,
    ListType.InDevelopment,
    ListType.InCodeReview,
    ListType.ReadyForTesting,
    ListType.InTesting,
  ],
  callback: trelloContext => returnToClarificationHandler(trelloContext),
};

const STOP_DEVELOPMENT_BUTTON: TrelloButton = {
  theme: "secondary",
  text: "Stop Development",
  icon: lucideIcon('pause'),
  condition: ButtonCondition.Edit,
  listTypes: [ListType.InDevelopment, ListType.InCodeReview],
  callback: trelloContext => returnToReadyForDevelopmentHandler(trelloContext),
};

const DONE_BUTTON: TrelloButton = {
  theme: "secondary",
  text: "Done",
  icon: lucideIcon('check'),
  condition: ButtonCondition.Edit,
  listTypes: [ListType.InClarification, ListType.InCodeReview, ListType.InTesting],
  cardTypes: { [CardType.CriticalIssue]: [ListType.InDevelopment, ListType.InCodeReview, ListType.ReadyForTesting] },
  callback: trelloContext => sendToDoneHandler(trelloContext),
};

export const BUTTONS: TrelloButton[] = [
  /**
   * Backlog
   */

  {
    theme: "primary",
    text: "Send for Clarification",
    icon: lucideIcon('text-search'),
    condition: ButtonCondition.Edit,
    listTypes: [ListType.BackLog],
    callback: trelloContext => sendForClarificationHandler(trelloContext),
  },

  /**
   * In Clarifictaion
   */

  DONE_BUTTON,

  {
    theme: "secondary",
    text: "Return in Backlog",
    icon: lucideIcon('graduation-cap'),
    condition: ButtonCondition.Edit,
    listTypes: [ListType.InClarification],
    callback: trelloContext => returnToBacklogHandler(trelloContext),
  },

  {
    theme: "primary",
    text: "Ready for Development",
    icon: lucideIcon('ellipsis'),
    condition: ButtonCondition.Edit,
    listTypes: [ListType.InClarification],
    callback: trelloContext => sendToReadyForDevelopmentHandler(trelloContext),
  },

  /**
   * Ready for Development
   */

  RETURN_FOR_CLARIFICATION_BUTTON,

  {
    theme: "primary",
    text: "Start Development",
    icon: lucideIcon('code-xml'),
    condition: ButtonCondition.Edit,
    listTypes: [ListType.ReadyForDevelopment],
    callback: trelloContext => sendToStartDevelopmentHandler(trelloContext),
  },

  /**
   * In Development
   */

  // ? DONE_BUTTON,
  // ? RETURN_FOR_CLARIFICATION_BUTTON,

  STOP_DEVELOPMENT_BUTTON,

  {
    theme: "primary",
    text: "Send to Code Review",
    icon: lucideIcon('database-search'),
    condition: ButtonCondition.Edit,
    listTypes: [ListType.InDevelopment],
    callback: trelloContext => sendToInCodeReviewHandler(trelloContext),
  },

  /**
   * In Code Review
   */

  // ? DONE_BUTTON,
  // ? RETURN_FOR_CLARIFICATION_BUTTON,
  // ? STOP_DEVELOPMENT_BUTTON,

  {
    theme: "primary",
    text: "Ready for Testing",
    icon: lucideIcon('bug'),
    condition: ButtonCondition.Edit,
    listTypes: [ListType.InCodeReview],
    callback: trelloContext => sendToReadyForTestingHandler(trelloContext),
  },

  /**
   * Ready for Testing
   */

  // ? DONE_BUTTON,
  // ? RETURN_FOR_CLARIFICATION_BUTTON,
];