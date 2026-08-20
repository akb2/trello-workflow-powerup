import { TrelloPowerUpContext } from "../../models/trello-power-up-context";

export const showSettingsConnector = (t: TrelloPowerUpContext): Promise<unknown> => t.popup({
  title: "Workflow Settings",
  url: "./settings.html",
  height: 400,
});