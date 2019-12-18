import { Action } from 'react-fetching-library';

export const makeCreateReplyAction: Action = ({
  videoId,
  commentId,
  payload,
}) => ({
  method: 'POST',
  endpoint: `${process.env.API_SERVER_URL}/videos/${videoId}/comments/${commentId}`,
  credentials: 'include',
  body: payload,
});
