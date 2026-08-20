import { API_KEY } from "./data/api-key";
import { cardBackSectionConnector } from "./pages/card-back-section";
import { showSettingsConnector } from "./pages/show-settings";

window.TrelloPowerUp.initialize({
  "card-back-section": cardBackSectionConnector,
  "show-settings": showSettingsConnector,
}, {
  appKey: API_KEY,
  appName: "Workflow",
});