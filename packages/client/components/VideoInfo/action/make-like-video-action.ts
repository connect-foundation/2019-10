import { Action } from 'react-fetching-library';

export const makeLikeVideoAction: Action = videoId => ({
  method: 'POST',
  endpoint: `${process.env.API_URL_HOST}/videos/${videoId}/likes`,
  credentials: 'include',
});
