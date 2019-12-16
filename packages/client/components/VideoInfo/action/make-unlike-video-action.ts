import { Action } from 'react-fetching-library';

export const makeUnlikeVideoAction: Action = videoId => ({
  method: 'DELETE',
  endpoint: `${process.env.API_URL_HOST}/videos/${videoId}/likes`,
  credentials: 'include',
});
