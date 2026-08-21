import { TASK_NUMBER_BADGE } from "../../data/badges";
import { TrelloCardBadge } from "../../models/trello-card-badge";
import { TrelloPowerUpContext } from "../../models/trello-power-up-context";

export const cardBadgesConnector = async (t: TrelloPowerUpContext): Promise<TrelloCardBadge[]> => [
  TASK_NUMBER_BADGE,
];