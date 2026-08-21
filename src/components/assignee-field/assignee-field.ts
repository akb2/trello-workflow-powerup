import { isDefined } from "@akb2/types-tools";
import { TrelloPowerUpContext } from "../../models/trello-power-up-context";
import { connectStyle } from "../../utils/connect-style";
import { lucideIcon } from "../../utils/lucide-icon";
import { openMemberPicker } from "../../utils/open-member-picker";
import { setCardAssignee } from "../../utils/set-card-assignee";
import { buttonComponent } from "../button/button";
import styles from "./assignee-field.css?url";
import { AssigneeFieldComponentProps } from "./assignee-field.types";

export const assigneeFieldComponent = async ({ trelloContext, refreshCallback }: AssigneeFieldComponentProps) => {
  const assigneeFieldElement = document.createElement("div");
  const currentUser = await trelloContext.member("id");

  if (!isDefined(currentUser)) {
    return null;
  }

  const [, assignToMeButton, openAssignButton] = await Promise.all([
    connectStyle(styles),
    buttonComponent({
      trelloContext,
      icon: lucideIcon('user-check'),
      theme: 'primary',
      text: 'Assign to me',
      callback: async () => {
        await setCardAssignee(trelloContext, currentUser.id);
        await refreshCallback();
      },
    }),
    buttonComponent({
      trelloContext,
      icon: lucideIcon('user-round-cog'),
      text: 'Open Assign',
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
  ]);

  assigneeFieldElement.classList.add("assignee-field");

  assigneeFieldElement.appendChild(assignToMeButton);
  assigneeFieldElement.appendChild(openAssignButton);

  return assigneeFieldElement;
};