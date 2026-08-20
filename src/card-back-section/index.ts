import { API_KEY } from "../data/api-key";

window.TrelloPowerUp.initialize({
  "card-back-section": async (t) => ({
    title: "Workflow",
    icon: "https://example.com/workflow.svg",
    content: {
      type: "iframe",
      url: t.signUrl("./workflow.html"),
      height: 96,
    },
  }),
}, {
  appKey: API_KEY,
  appName: "Workflow",
});