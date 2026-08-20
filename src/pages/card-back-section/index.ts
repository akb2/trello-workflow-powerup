import { API_KEY } from "../../data/api-key";

window.TrelloPowerUp.initialize({
  "card-back-section": async (t) => ({
    title: "Workflow",
    icon: "https://cdn.jsdelivr.net/npm/lucide-static@1.31.0/icons/workflow.svg",
    content: {
      type: "iframe",
      url: t.signUrl(`../workflow/index.html?v=${Date.now()}`),
      height: 136,
    },
  }),
}, {
  appKey: API_KEY,
  appName: "Workflow",
});