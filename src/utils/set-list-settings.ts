import { ListSettings } from "../models/list-settings";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { TrelloPowerUpDataScope } from "../models/trello-power-up-data-scope";
import { TrelloPowerUpDataVisibility } from "../models/trello-power-up-data-visibility";
import { getListSettings } from "./get-list-settings";
import { getListSettingsKey } from "./get-list-settings-key";

export const setListSettings = async (t: TrelloPowerUpContext, listId: string, newSettings: Partial<ListSettings>): Promise<void> => t.set(
  TrelloPowerUpDataScope.Board,
  TrelloPowerUpDataVisibility.Shared,
  getListSettingsKey(listId),
  {
    ...await getListSettings(t, listId),
    ...newSettings,
  },
);