import { Action } from 'react-fetching-library';

export const makeUnlikeCommentAction: Action = ({ videoId, commentId }) => ({
  method: 'DELETE',
  endpoint: `${process.env.API_URL_HOST}/videos/${videoId}/comments/${commentId}/likes`,
  credentials: 'include',
});
