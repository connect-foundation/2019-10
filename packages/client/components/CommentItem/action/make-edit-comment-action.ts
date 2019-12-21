import { Action } from 'react-fetching-library';

export const makeEditCommentAction: Action = ({
  videoId,
  commentId,
  payload,
}) => ({
  method: 'PATCH',
  endpoint: `${process.env.API_SERVER_URL}/videos/${videoId}/comments/${commentId}`,
  credentials: 'include',
  body: payload,
});
