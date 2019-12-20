export const TRANSCODER_NOTIFICATION_STATE = {
  PROGRESSING: 'PROGRESSING',
  COMPLETED: 'COMPLETED',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
};

export const endpoint = {
  auth: 'auth',
  githubLogin: '/github/login',
  users: 'users',
  tags: 'tags',
  videos: 'videos',
  myself: 'myself',
};

export const USER_ENDPOINT = {
  VERIFY: '/verify/:username',
};

export const clientPath = {
  signUp: 'http://localhost:3000/auth/signup',
  main: 'http://localhost:3000',
};

export const GITHUB_USER_DETAIL = 'GithubUserDetail';

export const ONE_MINUTE_MILLISECONDS = 60 * 1000;
export const ONE_DAY_MILLISECONDS = 24 * 3600 * 1000;
export const ONE_HOUR__MILLISECONDS = 3600 * 1000;

export const ONE_MINUTE_SECONDS = 60;
export const ONE_DAY_SECONDS = 24 * 3600;
export const ONE_HOUR_SECONDS = 3600;

export const SEARCHED_ITEM_NUMBER = 5;

export const TAG_ITEMS_PER_PAGE = 24;
export const TAG_QUERY_SELECT_COLUMNS = [
  'Tag.id',
  'Tag.name',
  'Tag.videosCount',
];

export const USER_ITEMS_PER_PAGE = 20;
export const USER_QUERY_SELECT_COLUMNS = [
  'User.id',
  'User.username',
  'User.avatar',
];

export const LATEST = 'latest';
export const POPULAR = 'popular';

export const PERIODS = {
  week: 'week',
  month: 'month',
  year: 'year',
  all: 'all',
};

export const MOMENT_SUBTRACT_FROM_NOW_ARGUMENTS = {
  week: [7, 'days'],
  month: [1, 'months'],
  year: [1, 'years'],
};

export const MOMENT_DATETIME_FORMAT = 'YYYY-MM-DD HH:MM:ss';

export const VIDEO_ITEMS_PER_PAGE = 20;
export const VIDEO_QUERY_SELECT_COLUMNS = [
  'Video.id',
  'Video.title',
  'Video.description',
  'Video.source',
  'Video.thumbnail',
  'Video.playtime',
  'Video.likedUsersCount',
  'Video.commentsCount',
  'Video.views',
  'Video.popularity',
  'Video.createdAt',
  'Video.updatedAt',
];
export const VIDEO_SEARCH_QUERY =
  '(Video.title like :titleKeyword) or (Video.description like :descriptionKeyword)';

export const USER_SEARCH_QUERY =
  '(User.username like :usernameKeyword) or (User.description like :descriptionKeyword)';

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

export const USER_VIDEO_ITEMS_PER_PAGE = 12;
export const CLIENT_ENDPOINT = {
  SIGN_UP: '/auth/signup',
};
