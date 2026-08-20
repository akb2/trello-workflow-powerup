import { API_KEY } from "../data/api-key";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";

export const getAuth = async (t: TrelloPowerUpContext) => {
  const api = await t.getRestApi();
  let token = await api.getToken();

  if (!token) {
    token = await api.authorize({
      scope: "read,write",
    });
  }

  return new URLSearchParams({
    key: API_KEY,
    token,
  });
};