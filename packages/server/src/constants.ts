export const TranscoderNotificationState = {
  progressing: 'PROGRESSING',
  completed: 'COMPLETED',
  warning: 'WARNING',
  error: 'ERROR',
};

export const endpoint = {
  auth: 'auth',
  githubLogin: '/github/login',
};

export const clientPath = {
  signUp: 'http://localhost:3000/auth/signup',
  main: 'http://localhost:3000',
};

export const ONE_DAY = 24 * 3600 * 1000;
