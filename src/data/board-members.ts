import { MembersCacheItem } from "../models/members-cache-item";

export const MEMBERS_CACHE_TTL = 5 * 60 * 1000;
export const MEMBERS_CACHE = new Map<string, MembersCacheItem>();