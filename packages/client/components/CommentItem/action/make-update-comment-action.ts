import { Action } from 'react-fetching-library';

export const makeUpdateCommentAction: Action = ({
  videoId,
  commentId,
  payload,
}) => ({
  method: 'PATCH',
  endpoint: `${process.env.API_URL_HOST}/videos/${videoId}/comments/${commentId}`,
  credentials: 'include',
  body: payload,
});
