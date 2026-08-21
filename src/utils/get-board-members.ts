import { isDefined } from "@akb2/types-tools";
import { MEMBERS_CACHE, MEMBERS_CACHE_TTL } from "../data/board-members";
import { TrelloMember } from "../models/trello-member";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getAuth } from "./get-auth";

const fetchBoardMembers = async (t: TrelloPowerUpContext, boardId: string,): Promise<TrelloMember[]> => {
  const auth = await getAuth(t);

  const params = new URLSearchParams({
    ...Object.fromEntries(auth),

    fields: [
      "id",
      "fullName",
      "username",
      "initials",
      "avatarUrl",
    ].join(","),
  });

  const response = await fetch(`https://api.trello.com/1/boards/${boardId}/members?${params}`);

  if (!response.ok) {
    throw new Error(`Failed to get board members: ${response.status}`);
  }

  return response.json();
};

export const getBoardMembers = async (t: TrelloPowerUpContext): Promise<TrelloMember[]> => {
  const { board: boardId } = t.getContext();

  if (!isDefined(boardId)) {
    throw new Error("Board context is not available");
  }

  const cached = MEMBERS_CACHE.get(boardId);

  if (cached && cached.expiresAt > Date.now()) {
    return cached.promise;
  }

  const promise = fetchBoardMembers(t, boardId,).catch((error) => {
    MEMBERS_CACHE.delete(boardId);

    throw error;
  });

  MEMBERS_CACHE.set(boardId, {
    promise,
    expiresAt: Date.now() + MEMBERS_CACHE_TTL,
  });

  return promise;
};