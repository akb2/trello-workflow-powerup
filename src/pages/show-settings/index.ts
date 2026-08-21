import { TrelloPowerUpContext } from "../../models/trello-power-up-context";

export const showSettingsConnector = (t: TrelloPowerUpContext): Promise<unknown> => t.popup({
  title: "Workflow Settings",
  url: "./index.html",
  height: 400,
});