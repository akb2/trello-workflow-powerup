import { TrelloCardBackSection } from "../../models/trello-card-back-section";
import { TrelloPowerUpContext } from "../../models/trello-power-up-context";

const workflowUrl = new URL("../workflow/index.html", window.location.href);

workflowUrl.searchParams.set("v", Date.now().toString());

export const cardBackSectionConnector = async (t: TrelloPowerUpContext): Promise<TrelloCardBackSection> => ({
  title: "Workflow",
  icon: "https://cdn.jsdelivr.net/npm/lucide-static@1.31.0/icons/workflow.svg",
  content: {
    type: "iframe",
    url: t.signUrl(workflowUrl.href),
    height: 136,
  },
})