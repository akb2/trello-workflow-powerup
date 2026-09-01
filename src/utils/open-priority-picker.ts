import { CARD_PRIORITY_ICONS } from "../data/card-priority-icons";
import { CARD_PRIORITY_NAMES } from "../data/card-priority-names";
import { CardPriority } from "../models/card-priority";
import { OpenPriorityPickerOptions } from "../models/open-priority-picker-options";

export const openPriorityPicker = async ({ trelloContext, selectedPriority, mouseEvent, onSelect }: OpenPriorityPickerOptions) => {
  const types = Object.values(CardPriority);

  return trelloContext.popup({
    title: "Select priority",
    mouseEvent,
    items: types
      .filter(type => type !== selectedPriority)
      .map((type) => ({
        text: CARD_PRIORITY_NAMES[type],
        avatar: CARD_PRIORITY_ICONS[type],
        callback: async () => {
          await onSelect(type);
          await trelloContext.closePopup();
        },
      })),
  });
};