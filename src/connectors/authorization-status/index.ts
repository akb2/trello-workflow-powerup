import { TrelloAuthorizationStatus } from "../../models/trello-authorization-status";
import { TrelloPowerUpContext } from "../../models/trello-power-up-context";

export const authorizationStatusConnector = async (t: TrelloPowerUpContext): Promise<TrelloAuthorizationStatus> => {
  const api = await t.getRestApi();

  return {
    authorized: await api.isAuthorized(),
  };
};