import { TrelloPowerUpContext } from "../../../models/trello-power-up-context";

export interface AssigneeFieldComponentProps {
  trelloContext: TrelloPowerUpContext;
  refreshCallback: () => Promise<void>;
}