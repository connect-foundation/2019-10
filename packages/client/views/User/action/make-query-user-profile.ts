import { Action } from 'react-fetching-library';

export const makeQueryUserProfile: Action = id => ({
  method: 'GET',
  endpoint: `${process.env.API_SERVER_URL}/users/${id}`,
});
