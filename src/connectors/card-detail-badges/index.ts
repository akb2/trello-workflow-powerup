import { TASK_NUMBER_BADGE } from "../../data/badges";
import { TrelloCardDetailBadge } from "../../models/trello-card-detail-badge";
import { TrelloPowerUpContext } from "../../models/trello-power-up-context";

export const cardDetailBadgesConnector = async (t: TrelloPowerUpContext): Promise<TrelloCardDetailBadge[]> => [
  TASK_NUMBER_BADGE,
];