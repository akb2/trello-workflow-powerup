import { TrelloCardBackSection } from "../../models/trello-card-back-section";
import { TrelloPowerUpContext } from "../../models/trello-power-up-context";

const url = new URL(import.meta.env.BASE_URL + "src/pages/workflow/index.html?1", window.location.origin);

url.searchParams.set("v", Date.now().toString());

export const cardBackSectionConnector = async (t: TrelloPowerUpContext): Promise<TrelloCardBackSection> => ({
  title: "Workflow",
  icon: "https://cdn.jsdelivr.net/npm/lucide-static@1.31.0/icons/workflow.svg",
  content: {
    type: "iframe",
    url: t.signUrl(url.href),
    height: 0,
  },
})