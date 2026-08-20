import { APP_OPTIONS } from "./data/app-settings";
import { cardBackSectionConnector } from "./pages/card-back-section";
import { showSettingsConnector } from "./pages/show-settings";

window.TrelloPowerUp.initialize({
  "card-back-section": cardBackSectionConnector,
  "show-settings": showSettingsConnector,
}, APP_OPTIONS);