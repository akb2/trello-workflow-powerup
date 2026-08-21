import { TrelloPowerUpContext } from "../../models/trello-power-up-context";


const url = new URL(import.meta.env.BASE_URL + "src/pages/settings/index.html", window.location.origin);

url.searchParams.set("v", Date.now().toString());

export const showSettingsConnector = (t: TrelloPowerUpContext): Promise<unknown> => t.popup({
  title: "Workflow Settings",
  url: t.signUrl(url.href),
  height: 400,
});