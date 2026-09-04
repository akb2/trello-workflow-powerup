import { TrelloCardUpdateAction } from "../models/trello-card-update-action";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getAuth } from "./get-auth";
import { getBoardSettingsPrivate } from "./get-board-settings-private";

export const getBoardCardUpdateActions = async (trelloContext: TrelloPowerUpContext): Promise<TrelloCardUpdateAction[]> => {
  const { board } = trelloContext.getContext();
  const [auth, { lastActionTime = 0 }] = await Promise.all([
    getAuth(trelloContext),
    getBoardSettingsPrivate(trelloContext),
  ]);

  const params = new URLSearchParams({
    ...Object.fromEntries(auth),
    filter: "updateCard",
    limit: "100",
    since: new Date(lastActionTime).toISOString(),
  });

  const response = await fetch(`https://api.trello.com/1/boards/${board}/actions?${params}`);

  if (!response.ok) {
    throw new Error("Failed to get board card actions");
  }

  return response.json();
};