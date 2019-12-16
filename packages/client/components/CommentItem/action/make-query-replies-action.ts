import { Action } from 'react-fetching-library';

export const makeQueryRepliesAction: Action = (videoId, commentId, page) => ({
  method: 'GET',
  endpoint: `${process.env.API_URL_HOST}/videos/${videoId}/comments/${commentId}/replies?page=${page}`,
  credentials: 'include',
});
