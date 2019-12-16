import { Action } from 'react-fetching-library';

import { endpoint } from '../../../constants';

export const makeQueryUserInfoAction: Action = (id: number) => ({
  method: 'GET',
  endpoint: `${process.env.API_SERVER_HOST}${endpoint.users}/${id}`,
});
