import { TrelloBadgeColor } from "../../models/trello-badge-color";
import { TrelloCardDetailBadge } from "../../models/trello-card-detail-badge";
import { TrelloPowerUpContext } from "../../models/trello-power-up-context";
import { getTaskNumber } from "../../utils/get-task-number";

export const cardDetailBadgesConnector = async (t: TrelloPowerUpContext): Promise<TrelloCardDetailBadge[]> => ([
  {
    text: `Task: ${await getTaskNumber(t)}`,
    color: TrelloBadgeColor.Blue,
  }
]);