import { TrelloCard } from "../models/trello-card";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getAuth } from "./get-auth";

export const getBoardCards = async (t: TrelloPowerUpContext): Promise<TrelloCard[]> => {
  const { board: boardId } = t.getContext();
  const auth = await getAuth(t);

  const response = await fetch(`https://api.trello.com/1/boards/${boardId}/cards?${auth}`);

  if (!response.ok) {
    throw new Error(`Failed to get board cards: ${response.status}`);
  }

  return response.json();
};