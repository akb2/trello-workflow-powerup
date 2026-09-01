export interface TrelloCommentAction {
  id: string;
  idMemberCreator: string;
  type: "commentCard";
  date: string;
}