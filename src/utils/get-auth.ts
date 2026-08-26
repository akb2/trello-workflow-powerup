import { API_KEY } from "../data/api-key";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";

export const getAuth = async (t: TrelloPowerUpContext) => {
  const api = await t.getRestApi();
  let token = await api.getToken();

  if (!token) {
    throw new Error("Power-Up is not authorized");
  }

  return new URLSearchParams({
    key: API_KEY,
    token,
  });
};