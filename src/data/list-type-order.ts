import { ListType } from "../models/list-type";

export const LIST_TYPE_ORDER: ListType[] = [
  ListType.BackLog,
  ListType.InClarification,
  ListType.ReadyForDevelopment,
  ListType.InDevelopment,
  ListType.InCodeReview,
  ListType.ReadyForTesting,
  ListType.InTesting,
  ListType.ReadyForRelease,
  ListType.Done,
];