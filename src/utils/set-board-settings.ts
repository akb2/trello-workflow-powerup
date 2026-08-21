import { BOARD_SETTINGS_KEY } from "../data/board-settings";
import { BoardSettings } from "../models/board-settings";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";
import { TrelloPowerUpDataScope } from "../models/trello-power-up-data-scope";
import { TrelloPowerUpDataVisibility } from "../models/trello-power-up-data-visibility";
import { getBoardSettings } from "./get-board-settings";

export const setBoardSettings = async (
  t: TrelloPowerUpContext,
  newSettings: Partial<BoardSettings>
): Promise<void> => t.set(
  TrelloPowerUpDataScope.Board,
  TrelloPowerUpDataVisibility.Shared,
  BOARD_SETTINGS_KEY,
  {
    ...await getBoardSettings(t),
    ...newSettings,
  },
);