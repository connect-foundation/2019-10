import { Action } from 'react-fetching-library';

export const makeQueryPopularCommentsAction: Action = (videoId, page) => ({
  method: 'GET',
  endpoint: `${process.env.API_URL_HOST}/videos/${videoId}/comments?page=${page}&sort=popular`,
  credentials: 'include',
});
