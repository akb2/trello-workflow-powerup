import { sendForClarificationHandler } from "../../handlers/send-for-clarification";
import { ButtonCondition } from "../../models/button-condition";
import { ListType } from "../../models/list-type";
import { TrelloButton } from "../../models/trello-button";
import { hasCurrentMemberRecentComment } from "../../utils/has-current-member-recent-comment";
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
    callback: async (trelloContext) => {
      const card = await trelloContext.card();
      const hasComment = await hasCurrentMemberRecentComment(trelloContext, card.id);

      if (!hasComment) {
        await trelloContext.alert({ message: "You must add a comment before returning for clarification.", duration: 15 });

        return;
      }

      await sendForClarificationHandler(trelloContext);
    },
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