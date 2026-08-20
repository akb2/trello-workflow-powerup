import { isDefined } from "@akb2/types-tools";
import { API_KEY } from "../data/api-key";
import { BUTTONS } from "./buttons";

window.TrelloPowerUp.initialize({
  "card-buttons": async (t) => {
    const list = await t.list("name");

    return BUTTONS
      .filter(({ listType }) => !isDefined(listType) || listType === list.name)
      .map(({ listType, ...button }) => button);
  },
}, {
  appKey: API_KEY,
  appName: "Workflow",
});