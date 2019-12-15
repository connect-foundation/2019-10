import { Action } from 'react-fetching-library';

import { endpoint } from '../../../constants';

export const makeQueryTagVideosAction: Action = (
  id: number,
  page: number,
  sort: string,
) => ({
  method: 'GET',
  endpoint: `${process.env.API_URL_HOST}${endpoint.tags}/${id}/videos?page=${page}&sort=${sort}`,
});
