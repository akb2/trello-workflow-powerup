import { isDefined } from "@akb2/types-tools";
import { APP_OPTIONS } from "../../data/app-settings";

const t = window.TrelloPowerUp.iframe(APP_OPTIONS);
const authorizeButton = document.getElementById("authorize-button");

if (!isDefined(authorizeButton)) {
  throw new Error("Authorize button not found");
}

authorizeButton.addEventListener(
  "click",
  async () => {
    const api = await t.getRestApi();

    await api.authorize({
      scope: "read,write",
    });

    await t.notifyParent("done");
  },
);