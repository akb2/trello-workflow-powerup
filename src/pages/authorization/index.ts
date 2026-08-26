import { isDefined } from "@akb2/types-tools";
import { buttonComponent } from "../../components/button/button";
import { APP_OPTIONS } from "../../data/app-settings";
import { lucideIcon } from "../../utils/lucide-icon";

const t = window.TrelloPowerUp.iframe(APP_OPTIONS);
const rootContainer = document.getElementById("root-container");
let renderPromise = Promise.resolve();

if (!isDefined(rootContainer)) {
  throw new Error("Root container not found");
}

/**
 * Render funcs
 */

const render = async () => rootContainer.replaceChildren(await buttonComponent({
  trelloContext: t,
  text: "Authorize",
  theme: "primary",
  icon: lucideIcon("log-in"),
  callback: async () => {
    const api = await t.getRestApi();

    await api.authorize({
      scope: "read,write",
    });

    await t.notifyParent("done");
  }
}));

const requestRender = (): Promise<void> => {
  renderPromise = renderPromise.then(render);

  return renderPromise;
};

/**
 * Render flow
 */

t.render(requestRender);