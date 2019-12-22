import { Action } from 'react-fetching-library';

import { endpoint } from '../../../constants';

export const makeQueryVideoTagsAction: Action = (id: number) => ({
  method: 'GET',
  endpoint: `${process.env.API_SERVER_URL}${endpoint.VIDEOS}/${id}/tags`,
});
