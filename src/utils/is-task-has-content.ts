import { TrelloCard } from "../models/trello-card";

export const isTaskHasContent = (card: TrelloCard): boolean => (
  card.desc?.trim().length > 0
  || card.attachments.length > 0
  || card.badges.comments > 0
);