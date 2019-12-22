import { Action } from 'react-fetching-library';

export const makeQueryLatest: Action = page => ({
  method: 'GET',
  endpoint: `${process.env.API_SERVER_URL}/videos?page=${page}&sort=latest`,
});
