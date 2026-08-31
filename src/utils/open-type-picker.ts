import { CARD_TYPES_ICONS } from "../data/card-type-icons";
import { CARD_TYPES_NAMES } from "../data/card-type-names";
import { CardType } from "../models/card-type";
import { OpenTypePickerOptions } from "../models/open-type-picker-options";

export const openTypePicker = async ({ trelloContext, selectedType, mouseEvent, onSelect }: OpenTypePickerOptions) => {
  const types = Object.values(CardType);

  return trelloContext.popup({
    title: "Select type",
    mouseEvent,
    items: types
      .filter(type => type !== selectedType)
      .map((type) => ({
        text: CARD_TYPES_NAMES[type],
        avatar: CARD_TYPES_ICONS[type],
        callback: async () => {
          await onSelect(type);
          await trelloContext.closePopup();
        },
      })),
  });
};