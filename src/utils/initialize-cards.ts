import { ListType } from "../models/list-type";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getBoardCards } from "./get-board-cards";
import { getCardSettings } from "./get-card-settings";
import { moveCardToList } from "./move-card-to-list";
import { setCardSettings } from "./set-card-settings";

export const initializeCards = async (t: TrelloPowerUpContext): Promise<void> => {
  const { board: boardId } = t.getContext();
  const cards = await getBoardCards(t);

  for (const card of cards) {
    const settings = await getCardSettings(t, card.id);

    if (settings.initializedBoardId === boardId) {
      continue;
    }

    await moveCardToList(t, card, ListType.BackLog);
    await setCardSettings(t, { initializedBoardId: boardId }, card.id);
  }
};