import { isDefined } from "@akb2/types-tools";
import { connectStyle } from "../../utils/connect-style";
import { getCardAssignee } from "../../utils/get-card-assignee";
import { getMemberAvatarUrl } from "../../utils/get-member-avatar-url";
import { lucideIcon } from "../../utils/lucide-icon";
import { setCardAssignee } from "../../utils/set-card-assignee";
import { buttonComponent } from "../button/button";
import styles from "./assignee.css?url";
import { AssigneeComponentProps } from "./assignee.types";

export const assigneeComponent = async ({ deleteCallback, trelloContext }: AssigneeComponentProps) => {
  const [, assignee] = await Promise.all([connectStyle(styles), getCardAssignee(trelloContext)]);

  if (!isDefined(assignee)) {
    return null;
  }

  const avatar = getMemberAvatarUrl(assignee);

  const assigneeElement = document.createElement("div");
  const assigneeTitleElement = document.createElement("span");
  const assigneeNameElement = document.createElement("span");
  const avatarElement = document.createElement("img");
  const deleteButton = await buttonComponent({
    trelloContext,
    icon: lucideIcon('x'),
    theme: 'danger',
    callback: async () => {
      await setCardAssignee(trelloContext, null);
      await deleteCallback();
    },
  });

  assigneeElement.classList.add("assignee");

  assigneeTitleElement.textContent = "Assignee to:";
  assigneeTitleElement.classList.add("assignee__title");

  assigneeNameElement.textContent = assignee.fullName;
  assigneeNameElement.classList.add("assignee__name");

  avatarElement.alt = assignee.fullName;
  avatarElement.src = avatar ? avatar : lucideIcon('user-round');
  avatarElement.classList.add(avatar ? "assignee__image" : "assignee__icon");

  deleteButton.classList.add("assignee__delete-button");

  assigneeElement.appendChild(avatarElement);
  assigneeElement.appendChild(assigneeTitleElement);
  assigneeElement.appendChild(assigneeNameElement);
  assigneeElement.appendChild(deleteButton);

  return assigneeElement;
};