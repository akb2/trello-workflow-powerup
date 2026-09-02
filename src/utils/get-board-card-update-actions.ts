import { TrelloCardUpdateAction } from "../models/trello-card-update-action";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getAuth } from "./get-auth";

export const getBoardCardUpdateActions = async (t: TrelloPowerUpContext): Promise<TrelloCardUpdateAction[]> => {
  const { board } = t.getContext();
  const auth = await getAuth(t);

  const params = new URLSearchParams({
    ...Object.fromEntries(auth),
    filter: "updateCard",
    limit: "100",
  });

  const response = await fetch(`https://api.trello.com/1/boards/${board}/actions?${params}`);

  if (!response.ok) {
    throw new Error("Failed to get board card actions");
  }

  return response.json();
};