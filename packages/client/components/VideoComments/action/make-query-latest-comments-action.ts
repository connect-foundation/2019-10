import { Action } from 'react-fetching-library';

export const makeQueryLatestCommentsAction: Action = (videoId, page) => ({
  method: 'GET',
  endpoint: `${process.env.API_SERVER_URL}/videos/${videoId}/comments?page=${page}&sort=latest`,
  credentials: 'include',
});
