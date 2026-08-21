import { cardBackSectionConnector } from "./connectors/card-back-section";
import { showSettingsConnector } from "./connectors/show-settings";
import { APP_OPTIONS } from "./data/app-settings";

window.TrelloPowerUp.initialize({
  "card-back-section": cardBackSectionConnector,
  "show-settings": showSettingsConnector,
}, APP_OPTIONS);