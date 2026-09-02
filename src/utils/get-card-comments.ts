import { isDefined } from "@akb2/types-tools";
import { TrelloCard } from "../models/trello-card";
import { TrelloCardComment } from "../models/trello-card-comment";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getAuth } from "./get-auth";

const CACHE_TTL = 5_000;
const cache = new Map<
  TrelloCard["id"],
  {
    expiresAt: number;
    comments: Promise<TrelloCardComment[]>;
  }
>();

export const getCardComments = (t: TrelloPowerUpContext, cardId: TrelloCard["id"]): Promise<TrelloCardComment[]> => {
  const cached = cache.get(cardId);

  if (isDefined(cached)) {
    if (cached.expiresAt > Date.now()) {
      return cached.comments;
    } else {
      cache.delete(cardId);
    }
  }

  const comments = (async () => {
    const auth = await getAuth(t);
    const params = new URLSearchParams({
      ...Object.fromEntries(auth),
      filter: "commentCard",
    });

    const response = await fetch(`https://api.trello.com/1/cards/${cardId}/actions?${params}`);

    if (!response.ok) {
      throw new Error("Failed to get card comments");
    }

    return response.json() as Promise<TrelloCardComment[]>;
  })();

  cache.set(cardId, {
    expiresAt: Date.now() + CACHE_TTL,
    comments,
  });

  comments.catch(() => {
    if (cache.get(cardId)?.comments === comments) {
      cache.delete(cardId);
    }
  });

  return comments;
};