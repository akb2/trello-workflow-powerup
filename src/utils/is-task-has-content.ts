export const isTaskHasContent = (card: { desc: string; attachments: unknown[]; badges: { comments: number } }): boolean => (
  card.desc.trim().length > 0
  || card.attachments.length > 0
  || card.badges.comments > 0
);