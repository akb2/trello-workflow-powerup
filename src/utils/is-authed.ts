import { isDefined } from "@akb2/types-tools";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";

export const isAuthed = async (t: TrelloPowerUpContext): Promise<boolean> => {
  try {
    const api = await t.getRestApi();
    let token = await api.getToken();

    return isDefined(token);
  } catch {
    return false;
  }
}