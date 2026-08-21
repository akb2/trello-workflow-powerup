import { isDefined } from "@akb2/types-tools";
import { APP_OPTIONS } from "../../data/app-settings";
import { TrelloModelType } from "../../models/trello-model-type";
import { getBoardSettings } from "../../utils/get-board-settings";
import { setBoardSettings } from "../../utils/set-board-settings";

const rootContainer = document.getElementById("root-container");

if (!isDefined(rootContainer)) {
  throw new Error("Root container not found");
}

const t = window.TrelloPowerUp.iframe(APP_OPTIONS);
const prefixInput = document.getElementById("task-number-prefix") as HTMLInputElement;
const saveButton = document.getElementById("save-button",) as HTMLButtonElement;
const settings = await getBoardSettings(t);

prefixInput.value = settings.taskPrefix;
saveButton.disabled = !t.memberCanWriteToModel(TrelloModelType.Board);

saveButton.addEventListener("click", async () => {
  await setBoardSettings(t, {
    ...settings,
    taskPrefix: prefixInput.value.trim(),
  });

  t.closePopup();
});

window.addEventListener("resize", () => t.sizeTo(rootContainer));