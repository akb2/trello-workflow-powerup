import { BOARD_SETTINGS_KEY, DEFAULT_BOARD_SETTINGS } from "../data/board-settings";
import { BoardSettings } from "../models/board-settings";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { TrelloPowerUpDataScope } from "../models/trello-power-up-data-scope";
import { TrelloPowerUpDataVisibility } from "../models/trello-power-up-data-visibility";

export const getBoardSettings = (t: TrelloPowerUpContext): Promise<BoardSettings> => t.get(
  TrelloPowerUpDataScope.Board,
  TrelloPowerUpDataVisibility.Shared,
  BOARD_SETTINGS_KEY,
  DEFAULT_BOARD_SETTINGS,
);