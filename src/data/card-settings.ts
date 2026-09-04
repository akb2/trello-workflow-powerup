import { CardSettings } from "../models/card-settings";

export const CARD_SETTINGS_KEY = "card_settings";

export const DEFAULT_CARD_SETTINGS: CardSettings = {
  initializedBoardId: undefined,
  assigneeId: null,
  priority: null,
  type: null,
};