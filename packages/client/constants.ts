export const MOBILE = 'mobile';
export const DESKTOP = 'desktop';
export const BREAKPOINT = 960;
export const MAX_WIDTH = 1200;
export const EVENT = {
  resize: 'resize',
};
export const LEFT = 'left';
export const TOP = 'top';
export const PERSISTENT = 'persistent';

export const TAGS_PER_PAGE = 24;
export const HOTLIST_VIDEOS_PER_PAGE = 20;
export const LATEST_VIDEOS_PER_PAGE = 20;
export const USER_VIDEOS_PER_PAGE = 12;
export const COMMENTS_PER_PAGE = 5;

export const fileType = {
  video: 'video',
  image: 'image',
};

export const VIDEO_FILE_ACTIONS = {
  UPLOAD: 'UPLOAD',
  COMPLETE: 'COMPLETE',
};

export const userActions = {
  logout: 'LOGOUT',
};

export const QUERY_STRING = {
  keyword: 'keyword',
};

export const endpoint = {
  tags: '/tags',
  hotlist: '/',
  latest: '/latest',
  uploadVideoFile: '/videos/upload/file',
  uploadVideoDetail: '/videos/upload/detail',
  search: '/search',
  login: '/auth/login',
  users: '/users',
  profileEdit: '/profile/edit',
};

export const SERVER_ENDPOINT = {
  VIDEO_UPLOAD: '/videos/upload',
  MYSELF: '/myself',
};

export const periods = {
  week: 'week',
  month: 'month',
  year: 'year',
  all: 'all',
};

export const periodOptions = [
  {
    label: '일주일',
    value: periods.week,
  },
  {
    label: '한달',
    value: periods.month,
  },
  {
    label: '일년',
    value: periods.year,
  },
  {
    label: '전체',
    value: periods.all,
  },
];

export const sortOptions = [
  {
    label: '인기 순',
    value: 'popular',
  },
  {
    label: '최신 순',
    value: 'latest',
  },
];

export const fontWeight = {
  regular: 400,
  bold: 700,
  extraBold: 800,
};

export const signUpFormDataMaxLength = {
  username: 30,
  introduction: 1500,
};

export const SEARCH_OPTION_LABELS = {
  videos: '영상',
  users: '사용자',
  tags: '태그',
  all: '모두',
};
export const SEARCH_OPTION_VALUES = {
  videos: 'videos',
  users: 'users',
  tags: 'tags',
  all: 'all',
};

export const orientation = {
  vertical: 'vertical',
  horizontal: 'horizontal',
};

export const VIDEO_FORM_DATA_MAX_LENGTH = {
  TITLE: '45',
  DESCRIPTION: '3000',
  TAGS: 10,
};

export const MAX_TAGS_NUMBER = 10;

export const ALLOWED_CHARS = ['.', '#', '-'];

export const SPACEBAR = ' ';

export const VIDEO_TYPE = 'video/mp4,video/x-m4v,video/*';

export const VIDEO_UPLOAD_FORM = {
  TITLE: 'title',
  DESCRIPTION: 'description',
};

export const VIDEO_UPLOAD_FORM_VALIDATION_CONDITION = {
  TITLE_LENGTH: 45,
  DESCRIPTION_LENGTH: 3000,
};

export const VIDEO_UPLOAD_FORM_VALIDATION_REGEX = {
  VALID_CHARACTERS: /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9-*()!%._ ]+$/,
};

export const VIDEO_UPLOAD_FORM_VALIDATION_MESSAGE = {
  TITLE_LENGTH: '제목의 길이는 45자가 최대입니다.',
  DESCRIPTION_LENGTH: '설명의 길이는 3000자가 최대입니다.',
  INVALID_CHARACTERS:
    '사용할 수 없는 문자가 포함되었습니다.(특수문자는 -, _, (, ), !, % 가능)',
  EMPTY_VALUE: '필수 항목입니다!',
};

export const TAG_VALIDATION_REGEX = {
  VALID_CHARACTERS: /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9-#._]+$/,
};
export const SET_TABS = 'setTabs';

export const CENTER = 'center';

export const ENTER = 'Enter';
