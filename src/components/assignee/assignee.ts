import { isDefined } from "@akb2/types-tools";
import { TrelloPowerUpContext } from "../../models/trello-power-up-context";
import { connectStyle } from "../../utils/connect-style";
import { getCardAssignee } from "../../utils/get-card-assignee";
import { lucideIcon } from "../../utils/lucide-icon";
import { openMemberPicker } from "../../utils/open-member-picker";
import { setCardAssignee } from "../../utils/set-card-assignee";
import { buttonComponent } from "../button/button";
import { userFullBadgeComponent } from "../user-full-badge/user-full-badge";
import styles from "./assignee.css?url";
import { AssigneeComponentProps } from "./assignee.types";

export const assigneeComponent = async ({ refreshCallback, trelloContext }: AssigneeComponentProps) => {
  const [, assignee, changeButton, deleteButton] = await Promise.all([
    connectStyle(styles),
    getCardAssignee(trelloContext),
    buttonComponent({
      trelloContext,
      icon: lucideIcon('user-round-cog'),
      theme: 'secondary',
      callback: ({ }: TrelloPowerUpContext, mouseEvent: MouseEvent) => openMemberPicker({
        trelloContext,
        mouseEvent,
        onSelect: async (member) => {
          await setCardAssignee(trelloContext, member.id);
          await refreshCallback();
        }
      }),
    }),
    buttonComponent({
      trelloContext,
      icon: lucideIcon('x'),
      theme: 'danger',
      callback: async () => {
        await setCardAssignee(trelloContext, null);
        await refreshCallback();
      },
    }),
  ]);

  if (!isDefined(assignee)) {
    return null;
  }

  const assigneeElement = document.createElement("div");
  const assigneeBadgeElement = await userFullBadgeComponent({
    trelloContext,
    title: "Assignee to:",
    userId: assignee.id
  });

  assigneeElement.classList.add("assignee");

  if (isDefined(assigneeBadgeElement)) {
    assigneeElement.appendChild(assigneeBadgeElement);
  }

  assigneeElement.appendChild(changeButton);
  assigneeElement.appendChild(deleteButton);

  return assigneeElement;
};