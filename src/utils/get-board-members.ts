import { TrelloMember } from "../models/trello-member";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getAuth } from "./get-auth";

export const getBoardMembers = async (t: TrelloPowerUpContext): Promise<TrelloMember[]> => {
  const { board } = t.getContext();
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

  const response = await fetch(`https://api.trello.com/1/boards/${board}/members?${params}`);

  if (!response.ok) {
    throw new Error("Failed to get board members");
  }

  return response.json();
};