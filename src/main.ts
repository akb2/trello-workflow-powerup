import { boardButtonsConnector } from "./connectors/board-buttons";
import { cardBackSectionConnector } from "./connectors/card-back-section";
import { cardBadgesConnector } from "./connectors/card-badges";
import { cardDetailBadgesConnector } from "./connectors/card-detail-badges";
import { showSettingsConnector } from "./connectors/show-settings";
import { APP_OPTIONS } from "./data/app-settings";

window.TrelloPowerUp.initialize({
  "board-buttons": boardButtonsConnector,
  "card-back-section": cardBackSectionConnector,
  "show-settings": showSettingsConnector,
  "card-badges": cardBadgesConnector,
  "card-detail-badges": cardDetailBadgesConnector,
}, APP_OPTIONS);