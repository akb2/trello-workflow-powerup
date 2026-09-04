import { BOARD_SETTINGS_PRIVATE_KEY, DEFAULT_BOARD_SETTINGS_PRIVATE } from "../data/board-settings-private";
import { BoardSettingsPrivate } from "../models/board-settings-private";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { TrelloPowerUpDataScope } from "../models/trello-power-up-data-scope";
import { TrelloPowerUpDataVisibility } from "../models/trello-power-up-data-visibility";

export const getBoardSettingsPrivate = (t: TrelloPowerUpContext): Promise<BoardSettingsPrivate> => t.get(
  TrelloPowerUpDataScope.Board,
  TrelloPowerUpDataVisibility.Private,
  BOARD_SETTINGS_PRIVATE_KEY,
  DEFAULT_BOARD_SETTINGS_PRIVATE,
);