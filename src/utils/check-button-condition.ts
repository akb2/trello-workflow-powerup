import { ButtonCondition } from "../models/button-condition";
import { TrelloModelType } from "../models/trello-model-type";
import { TrelloPermission } from "../models/trello-permission";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";

export const checkButtonCondition = (t: TrelloPowerUpContext, condition: ButtonCondition): boolean => {
  const context = t.getContext();

  switch (condition) {
    case ButtonCondition.Admin:
      return t.memberCanWriteToModel(TrelloModelType.Board) && context.permissions.board === TrelloPermission.Write;
    case ButtonCondition.Edit:
      return t.memberCanWriteToModel(TrelloModelType.Card);
    case ButtonCondition.ReadOnly:
      return !t.memberCanWriteToModel(TrelloModelType.Card);
    case ButtonCondition.SignedIn:
      return t.isMemberSignedIn();
    case ButtonCondition.SignedOut:
      return !t.isMemberSignedIn();
    case ButtonCondition.Always:
      return true;
  }
};