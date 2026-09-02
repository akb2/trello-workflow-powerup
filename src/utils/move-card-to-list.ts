import { ListType } from "../models/list-type";
import { TrelloCard } from "../models/trello-card";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getAuth } from "./get-auth";
import { getLists } from "./get-lists";

export const moveCardToList = async (t: TrelloPowerUpContext, card: TrelloCard, targetColumn: ListType) => {
  const auth = await getAuth(t);
  const lists = await getLists(t);
  const targetList = lists.find(({ name }) => name === targetColumn);

  if (!targetList) {
    throw new Error(`Column "${targetColumn}" not found`);
  }

  if (targetList.id === card.idList) {
    return;
  }

  const moveResponse = await fetch(
    `https://api.trello.com/1/cards/${card.id}?${new URLSearchParams({
      ...Object.fromEntries(auth),
      idList: targetList.id,
    })}`,
    { method: "PUT", },
  );

  if (!moveResponse.ok) {
    throw new Error("Failed to move card");
  }
};