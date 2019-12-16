import { Action } from 'react-fetching-library';

export const makeCreateCommentAction: Action = ({ videoId, payload }) => ({
  method: 'POST',
  endpoint: `${process.env.API_URL_HOST}/videos/${videoId}/comments`,
  credentials: 'include',
  body: payload,
});
