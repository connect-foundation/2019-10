import { Action } from 'react-fetching-library';

export const makeLikeVideoAction: Action = videoId => ({
  method: 'POST',
  endpoint: `${process.env.API_SERVER_URL}/videos/${videoId}/likes`,
  credentials: 'include',
});
