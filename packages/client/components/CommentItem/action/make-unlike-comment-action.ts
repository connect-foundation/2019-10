import { Action } from 'react-fetching-library';

export const makeUnlikeCommentAction: Action = ({ videoId, commentId }) => ({
  method: 'DELETE',
  endpoint: `${process.env.API_SERVER_URL}/videos/${videoId}/comments/${commentId}/likes`,
});
