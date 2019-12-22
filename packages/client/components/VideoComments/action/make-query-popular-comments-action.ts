import { Action } from 'react-fetching-library';

export const makeQueryPopularCommentsAction: Action = (videoId, page) => ({
  method: 'GET',
  endpoint: `${process.env.API_SERVER_URL}/videos/${videoId}/comments?page=${page}&sort=popular`,
});
