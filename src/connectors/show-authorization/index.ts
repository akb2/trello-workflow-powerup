import { TrelloPowerUpContext } from "../../models/trello-power-up-context";

const url = new URL(import.meta.env.BASE_URL + "src/pages/authorization/index.html", window.location.origin);

export const showAuthorizationConnector = (t: TrelloPowerUpContext): Promise<unknown> => t.popup({
  title: "Authorize Workflow",
  url: url.href,
  height: 120,
  callback: (trelloContext: TrelloPowerUpContext) => trelloContext.closePopup(),
});