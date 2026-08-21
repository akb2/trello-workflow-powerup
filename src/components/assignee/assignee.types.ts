import { TrelloPowerUpContext } from "../../models/trello-power-up-context";

export interface AssigneeComponentProps {
  trelloContext: TrelloPowerUpContext;
  deleteCallback: () => Promise<void>;
}