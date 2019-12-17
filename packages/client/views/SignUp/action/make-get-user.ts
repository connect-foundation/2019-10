import { Action } from 'react-fetching-library';

import { endpoint } from '../../../constants';

export const makeGetUserAction: Action = (username: string) => ({
  method: 'GET',
  endpoint: `${process.env.API_SERVER_URL}${endpoint.verifyUsername}/${username}`,
});
