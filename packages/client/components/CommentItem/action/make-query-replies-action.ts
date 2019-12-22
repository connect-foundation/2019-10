import { Action } from 'react-fetching-library';

export const makeQueryRepliesAction: Action = (videoId, commentId, page) => ({
  method: 'GET',
  endpoint: `${process.env.API_SERVER_URL}/videos/${videoId}/comments/${commentId}/replies?page=${page}`,
});
