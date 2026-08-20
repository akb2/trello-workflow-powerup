import { API_KEY } from "../../data/api-key";

window.TrelloPowerUp.initialize({
  "show-settings": (t) => t.popup({
    title: "Workflow Settings",
    url: "./settings.html",
    height: 400,
  }),
}, {
  appKey: API_KEY,
  appName: "Workflow",
});