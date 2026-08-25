import { isDefined } from "@akb2/types-tools";
import { connectStyle } from "../../utils/connect-style";
import { getBoardMembers } from "../../utils/get-board-members";
import { getMemberAvatarUrl } from "../../utils/get-member-avatar-url";
import { lucideIcon } from "../../utils/lucide-icon";
import styles from "./user-full-badge.css?url";
import { UserFullBadgeComponentProps } from "./user-full-badge.types";

export const userFullBadgeComponent = async ({ trelloContext, title, userId }: UserFullBadgeComponentProps) => {
  const [, members] = await Promise.all([
    connectStyle(styles),
    await getBoardMembers(trelloContext)
  ]);
  const member = members.find((member) => member.id === userId);

  if (!isDefined(member)) {
    return null;
  }

  const avatar = getMemberAvatarUrl(member);

  const userElement = document.createElement("div");
  const userTitleElement = document.createElement("span");
  const userNameElement = document.createElement("span");
  const avatarElement = document.createElement("img");

  userElement.classList.add("user-full-badge");

  userTitleElement.textContent = title;
  userTitleElement.classList.add("user-full-badge__title");

  userNameElement.textContent = member.fullName;
  userNameElement.classList.add("user-full-badge__name");

  avatarElement.alt = member.fullName;
  avatarElement.src = avatar ? avatar : lucideIcon('user-round');
  avatarElement.classList.add(avatar ? "user-full-badge__image" : "user-full-badge__icon");

  userElement.appendChild(avatarElement);
  userElement.appendChild(userTitleElement);
  userElement.appendChild(userNameElement);

  return userElement;
};