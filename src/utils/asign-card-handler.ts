import { TrelloCard } from "../models/trello-card";
import { TrelloMember } from "../models/trello-member";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getAuth } from "./get-auth";

export const asignCardHandler = async (t: TrelloPowerUpContext, cardId: TrelloCard['id'], memberId: TrelloMember['id']) => {
  const auth = await getAuth(t);

  const assignResponse = await fetch(
    `https://api.trello.com/1/cards/${cardId}/idMembers?${new URLSearchParams({
      ...Object.fromEntries(auth),
      value: memberId,
    })}`,
    {
      method: "POST",
    },
  );

  if (!assignResponse.ok) {
    throw new Error("Failed to assign current member");
  }
};