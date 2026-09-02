import { isDefined } from "@akb2/types-tools";
import { TrelloCard } from "../models/trello-card";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getCardSettings } from "../utils/get-card-settings";
import { isTaskHasContent } from "../utils/is-task-has-content";

export const readyForDevelopmentValidator = async (trelloContext: TrelloPowerUpContext, card: TrelloCard): Promise<boolean> => {
  const { priority, type } = await getCardSettings(trelloContext, card.id);
  const hasContent = isTaskHasContent(card);

  if (!hasContent || !isDefined(priority) || !isDefined(type)) {
    const message = `
      The task must have:
      ${!hasContent ? "- Description, attachments, or comments" : ""}
      ${!isDefined(priority) ? "- A defined task priority" : ""}
      ${!isDefined(type) ? "- A defined task type" : ""}
    `;

    trelloContext.alert({ message, duration: 15 });

    return false;
  }

  return true;
};