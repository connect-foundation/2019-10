import { Action } from 'react-fetching-library';

export const makeLikeCommentAction: Action = ({ videoId, commentId }) => ({
  method: 'POST',
  endpoint: `${process.env.API_SERVER_URL}/videos/${videoId}/comments/${commentId}/likes`,
  credentials: 'include',
});
