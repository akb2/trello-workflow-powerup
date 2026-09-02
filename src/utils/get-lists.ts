import { TrelloList } from "../models/trello-list";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";

export const getLists = (trelloContext: TrelloPowerUpContext): Promise<TrelloList[]> => trelloContext.lists("id", "name");