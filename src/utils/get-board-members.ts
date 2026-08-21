import { TrelloMember } from "../models/trello-member";
import { TrelloPowerUpContext } from "../models/trello-power-up-context";

export const getBoardMembers = async (t: TrelloPowerUpContext): Promise<TrelloMember[]> => {
  const { members } = await t.board("members");

  return members;
};