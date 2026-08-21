import { TrelloPowerUp } from "./models/trello-power-up";

declare global {
  interface Window {
    TrelloPowerUp: TrelloPowerUp;
  }
}