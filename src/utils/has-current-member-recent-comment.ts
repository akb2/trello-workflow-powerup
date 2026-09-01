import { TrelloCommentAction } from "../models/trello-comment-action";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getAuth } from "./get-auth";

export const hasCurrentMemberRecentComment = async (t: TrelloPowerUpContext, cardId: string): Promise<boolean> => {
  const [auth, member] = await Promise.all([
    getAuth(t),
    t.member("id"),
  ]);

  const params = new URLSearchParams({
    ...Object.fromEntries(auth),
    filter: "commentCard",
  });

  const response = await fetch(`https://api.trello.com/1/cards/${cardId}/actions?${params}`);

  if (!response.ok) {
    throw new Error("Failed to get card comments");
  }

  const actions = await response.json() as TrelloCommentAction[];
  const hourAgo = Date.now() - 60 * 60 * 1000;

  return actions.some(({ idMemberCreator, date }) => idMemberCreator === member.id && Date.parse(date) >= hourAgo);
};