export const COMMENT_ITEMS_PER_PAGE = 5;

export const COMMENT_QUERY_SELECT_COLUMNS = [
  'Comment.id',
  'Comment.content',
  'Comment.likedUsersCount',
  'Comment.childrenCount',
  'Comment.popularity',
  'Comment.createdAt',
  'Comment.updatedAt',
];
