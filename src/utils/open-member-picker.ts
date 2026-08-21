import { OpenMemberPickerOptions } from "../models/open-member-picker-options";
import { getBoardMembers } from "./get-board-members";
import { getMemberAvatarUrl } from "./get-member-avatar-url";

export const openMemberPicker = async ({
  trelloContext,
  disabledMemberIds = [],
  onSelect,
  mouseEvent,
}: OpenMemberPickerOptions): Promise<unknown> => {
  const members = await getBoardMembers(trelloContext);

  const disabledIds = new Set(
    disabledMemberIds,
  );

  return trelloContext.popup({
    title: "Select assignee",
    mouseEvent,
    items: members
      .filter(({ id }) => !disabledIds.has(id))
      .map((member) => ({
        text: member.fullName,
        avatar: getMemberAvatarUrl(member),
        callback: async () => {
          await onSelect(member);
          await trelloContext.closePopup();
        },
      })),
    search: {
      count: 10,
      placeholder: "Search members",
      empty: "No members found",
    },
  });
};