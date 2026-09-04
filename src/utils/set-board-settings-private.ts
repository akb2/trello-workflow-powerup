import { BOARD_SETTINGS_PRIVATE_KEY } from "../data/board-settings-private";
import { BoardSettingsPrivate } from "../models/board-settings-private";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { TrelloPowerUpDataScope } from "../models/trello-power-up-data-scope";
import { TrelloPowerUpDataVisibility } from "../models/trello-power-up-data-visibility";
import { getBoardSettingsPrivate } from "./get-board-settings-private";

export const setBoardSettingsPrivate = async (trelloContext: TrelloPowerUpContext, newSettings: Partial<BoardSettingsPrivate>): Promise<void> => trelloContext.set(
  TrelloPowerUpDataScope.Board,
  TrelloPowerUpDataVisibility.Private,
  BOARD_SETTINGS_PRIVATE_KEY,
  {
    ...await getBoardSettingsPrivate(trelloContext),
    ...newSettings,
  },
);