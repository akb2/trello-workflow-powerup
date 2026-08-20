export interface TrelloAuthorizeOptions {
  scope?: "read" | "write" | "read,write";
  expiration?: "1hour" | "1day" | "30days" | "never";
}