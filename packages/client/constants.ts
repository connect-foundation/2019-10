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

export const userActions = {
  logout: 'LOGOUT',
};

export const endpoint = {
  tags: '/tags',
  hotlist: '/',
  latest: '/latest',
  upload: '/videos/upload',
  search: '/search',
  login: '/auth/login',
  users: '/users',
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
