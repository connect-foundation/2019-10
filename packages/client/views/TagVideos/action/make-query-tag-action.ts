import { Action } from 'react-fetching-library';

import { endpoint } from '../../../constants';

export const makeQueryTagAction: Action = (id: number) => ({
  method: 'GET',
  endpoint: `${process.env.API_URL_HOST}${endpoint.tags}/${id}`,
});
