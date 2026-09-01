import { isDefined } from "@akb2/types-tools";
import { TrelloPowerUpContext } from "../../models/trello-power-up-context";
import { initializeCards } from "../../utils/initialize-cards";

let intervalId: number | undefined;
let currentBoardId: string | undefined;
let processing = false;

export const boardButtonsConnector = async (t: TrelloPowerUpContext): Promise<unknown[]> => {
  const { board: boardId } = t.getContext();

  if (currentBoardId === boardId) {
    return [];
  }

  if (isDefined(intervalId)) {
    window.clearInterval(intervalId);
  }

  currentBoardId = boardId;

  const process = async (): Promise<void> => {
    if (processing) {
      return;
    }

    processing = true;

    try {
      await initializeCards(t);
    } catch (error) {
      console.error("Failed to initialize cards", error);
    } finally {
      processing = false;
    }
  };

  await process();

  intervalId = window.setInterval(() => void process(), 2_000);

  return [];
};