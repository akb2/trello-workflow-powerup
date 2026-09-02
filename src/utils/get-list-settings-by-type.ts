import { isDefined } from "@akb2/types-tools";
import { ListSettings } from "../models/list-settings";
import { ListType } from "../models/list-type";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { getListSettings } from "./get-list-settings";
import { getLists } from "./get-lists";

export const getListSettingsByType = async (t: TrelloPowerUpContext, listType: ListType): Promise<ListSettings> => {
  const lists = await getLists(t);
  const list = lists.find((l) => l.name === listType);

  if (!isDefined(list)) {
    throw new Error(`List with type ${listType} not found`);
  }

  return getListSettings(t, list.id);
};