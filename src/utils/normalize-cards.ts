import { isDefined, NotDefinable } from "@akb2/types-tools";
import { TrelloCardUpdateAction } from "../models/trello-card-update-action";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getBoardCardUpdateActions } from "./get-board-card-update-actions";
import { getCards } from "./get-cards";
import { normalizeCardList } from "./normalize-card-list";
import { normalizeCardPosition } from "./normalize-card-position";

const processedActions = new Set<TrelloCardUpdateAction["id"]>();

export const normalizeCards = async (t: TrelloPowerUpContext): Promise<void> => {
  const [cards, actions, member] = await Promise.all([
    getCards(t),
    getBoardCardUpdateActions(t),
    t.member("id"),
  ]);

  const actualActionIds = new Set(actions.map(({ id }) => id));

  for (const actionId of processedActions) {
    if (!actualActionIds.has(actionId)) {
      processedActions.delete(actionId);
    }
  }

  for (const card of cards) {
    let listAction: NotDefinable<TrelloCardUpdateAction>;
    let positionAction: NotDefinable<TrelloCardUpdateAction>;

    for (const action of actions) {
      if (action.data.card.id !== card.id || action.idMemberCreator !== member.id || isDefined(action.appCreator)) {
        continue;
      }

      if (!isDefined(listAction) && isDefined(action.data.listBefore) && isDefined(action.data.listAfter)) {
        listAction = action;
      }

      if (!isDefined(positionAction) && isDefined(action.data.old?.pos)) {
        positionAction = action;
      }

      if (isDefined(listAction) && isDefined(positionAction)) {
        break;
      }
    }

    let normalizedCard = card;

    if (isDefined(listAction) && !processedActions.has(listAction.id)) {
      normalizedCard = await normalizeCardList(t, normalizedCard, listAction);

      processedActions.add(listAction.id);
    }

    if (isDefined(positionAction) && !processedActions.has(positionAction.id)) {
      await normalizeCardPosition(t, normalizedCard);

      processedActions.add(positionAction.id);
    }
  }
};