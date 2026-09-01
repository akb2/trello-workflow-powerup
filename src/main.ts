import { authorizationStatusConnector } from "./connectors/authorization-status";
import { boardButtonsConnector } from "./connectors/board-buttons";
import { cardBackSectionConnector } from "./connectors/card-back-section";
import { cardBadgesConnector } from "./connectors/card-badges";
import { cardDetailBadgesConnector } from "./connectors/card-detail-badges";
import { listSortersConnector } from "./connectors/list-sorters";
import { showAuthorizationConnector } from "./connectors/show-authorization";
import { showSettingsConnector } from "./connectors/show-settings";
import { APP_OPTIONS } from "./data/app-settings";

window.TrelloPowerUp.initialize({
  "authorization-status": authorizationStatusConnector,
  "show-authorization": showAuthorizationConnector,
  "board-buttons": boardButtonsConnector,
  "card-back-section": cardBackSectionConnector,
  "show-settings": showSettingsConnector,
  "card-badges": cardBadgesConnector,
  "card-detail-badges": cardDetailBadgesConnector,
  "list-sorters": listSortersConnector,
}, APP_OPTIONS);