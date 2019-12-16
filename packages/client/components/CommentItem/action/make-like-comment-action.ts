import { Action } from 'react-fetching-library';

export const makeLikeCommentAction: Action = ({ videoId, commentId }) => ({
  method: 'POST',
  endpoint: `${process.env.API_URL_HOST}/videos/${videoId}/comments/${commentId}/likes`,
  credentials: 'include',
});
