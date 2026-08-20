import { API_KEY } from "../../data/api-key";

const workflowUrl = new URL("../workflow/index.html", window.location.href);

workflowUrl.searchParams.set("v", Date.now().toString());

window.TrelloPowerUp.initialize({
  "card-back-section": async (t) => ({
    title: "Workflow",
    icon: "https://cdn.jsdelivr.net/npm/lucide-static@1.31.0/icons/workflow.svg",
    content: {
      type: "iframe",
      url: t.signUrl(workflowUrl.href),
      height: 136,
    },
  }),
}, {
  appKey: API_KEY,
  appName: "Workflow",
});