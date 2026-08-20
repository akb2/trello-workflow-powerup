import { ListType } from "../models/list-type";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { asignCardHandler } from "./asign-card-handler";
import { moveCardToList } from "./move-card-to-list";

export const startDevelopmentHandler = async (t: TrelloPowerUpContext) => {
  const card = await t.card("id");
  const member = await t.member("id");

  await moveCardToList(t, card.id, ListType.InDevelopment);
  await asignCardHandler(t, card.id, member.id);
};