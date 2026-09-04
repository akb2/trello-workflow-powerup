import { isDefined } from "@akb2/types-tools";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getBoardCardUpdateActions } from "./get-board-card-update-actions";
import { getCardsMap } from "./get-cards-map";
import { normalizeCardList } from "./normalize-card-list";
import { normalizeCardPosition } from "./normalize-card-position";
import { setBoardSettingsPrivate } from "./set-board-settings-private";

export const normalizeCards = async (trelloContext: TrelloPowerUpContext): Promise<void> => {
  const [cardsMap, actions, member] = await Promise.all([
    getCardsMap(trelloContext),
    getBoardCardUpdateActions(trelloContext),
    trelloContext.member("id"),
  ]);
  const actionsCount = actions.length;

  if (actionsCount < 1) {
    return;
  }

  for (let i = actionsCount - 1; i >= 0; i--) {
    const action = actions[i];
    const actionDate = Date.parse(action.date);
    let card = cardsMap.get(action.data.card.id);

    if (!isDefined(card)) {
      continue;
    }

    if (action.idMemberCreator !== member.id || isDefined(action.appCreator)) {
      continue;
    }

    if (isDefined(action.data.listBefore) && isDefined(action.data.listAfter)) {
      card = await normalizeCardList(trelloContext, card, action);
      cardsMap.set(card.id, card);
    }

    await normalizeCardPosition(trelloContext, card);
    await setBoardSettingsPrivate(trelloContext, { lastActionTime: actionDate });
  }
};