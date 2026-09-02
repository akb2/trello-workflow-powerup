import { isDefined } from "@akb2/types-tools";
import { TrelloCard } from "../models/trello-card";
import { TrelloCardUpdateAction } from "../models/trello-card-update-action";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getBoardCardUpdateActions } from "./get-board-card-update-actions";
import { getCards } from "./get-cards";
import { normalizeCardList } from "./normalize-card-list";
import { normalizeCardPosition } from "./normalize-card-position";

const processedActions = new Map<TrelloCard["id"], TrelloCardUpdateAction["id"]>();

export const normalizeCards = async (t: TrelloPowerUpContext): Promise<void> => {
  const [cards, actions, member] = await Promise.all([
    getCards(t),
    getBoardCardUpdateActions(t),
    t.member("id"),
  ]);

  for (const card of cards) {
    const action = actions.find(({ data }) => data.card.id === card.id);

    if (!isDefined(action)) {
      continue;
    }

    if (action.idMemberCreator !== member.id) {
      continue;
    }

    if (isDefined(action.appCreator)) {
      continue;
    }

    if (processedActions.get(card.id) === action.id) {
      continue;
    }

    const isListMove = isDefined(action.data.listBefore) && isDefined(action.data.listAfter);
    const isPositionMove = isDefined(action.data.old?.pos);

    if (!isListMove && !isPositionMove) {
      continue;
    }

    processedActions.set(
      card.id,
      action.id,
    );

    const normalizedCard = await normalizeCardList(t, card, action);

    await normalizeCardPosition(t, normalizedCard);
  }
};