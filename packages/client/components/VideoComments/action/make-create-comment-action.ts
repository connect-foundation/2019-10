import { Action } from 'react-fetching-library';

export const makeCreateCommentAction: Action = ({ videoId, payload }) => ({
  method: 'POST',
  endpoint: `${process.env.API_SERVER_URL}/videos/${videoId}/comments`,
  credentials: 'include',
  body: payload,
});
