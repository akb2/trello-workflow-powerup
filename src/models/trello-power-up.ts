import { TrelloPowerUpCapabilities } from "./trello-power-up-capabilities";
import { TrelloPowerUpContext } from "./trello-power-up-context";
import { TrelloPowerUpInitializeOptions } from "./trello-power-upInitialize-options";

export interface TrelloPowerUp {
  initialize(capabilities: TrelloPowerUpCapabilities, options?: TrelloPowerUpInitializeOptions): void;
  iframe(options?: TrelloPowerUpInitializeOptions): TrelloPowerUpContext;
}