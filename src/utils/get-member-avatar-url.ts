import { TrelloMember } from "../models/trello-member";

export const getMemberAvatarUrl = (member: TrelloMember, size = 50): string | null => {
  if (!member.avatarUrl) {
    return null;
  }

  return `${member.avatarUrl}/${size}.png`;
};