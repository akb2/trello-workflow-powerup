import { DEFAULT_LIST_SETTINGS } from "../data/list-settings";
import { ListSettings } from "../models/list-settings";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { TrelloPowerUpDataScope } from "../models/trello-power-up-data-scope";
import { TrelloPowerUpDataVisibility } from "../models/trello-power-up-data-visibility";
import { getListSettingsKey } from "./get-list-settings-key";

export const getListSettings = (t: TrelloPowerUpContext, listId: string): Promise<ListSettings> => t.get(
  TrelloPowerUpDataScope.Board,
  TrelloPowerUpDataVisibility.Shared,
  getListSettingsKey(listId),
  DEFAULT_LIST_SETTINGS,
);