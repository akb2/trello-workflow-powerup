import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getCardComments } from "./get-card-comments";

export const hasCurrentMemberRecentComment = async (t: TrelloPowerUpContext, cardId: string): Promise<boolean> => {
  const [comment, member] = await Promise.all([
    getCardComments(t, cardId),
    t.member("id"),
  ]);
  const hourAgo = Date.now() - 60 * 60 * 1000;

  return comment.some(({ idMemberCreator, date }) => idMemberCreator === member.id && Date.parse(date) >= hourAgo);
};