import { Action } from 'react-fetching-library';

import { endpoint } from '../../../constants';

export const makeQueryUserAction: Action = (username: string) => ({
  method: 'GET',
  endpoint: `${process.env.API_SERVER_URL}${endpoint.verifyUserInfo}/${username}`,
});
