import { Action } from 'react-fetching-library';

import { endpoint } from '../../../constants';

export const makeQueryTaggedVideosAction: Action = (
  id: number,
  page: number,
  sort: string,
) => ({
  method: 'GET',
  endpoint: `${process.env.API_SERVER_URL}${endpoint.tags}/${id}/videos?page=${page}&sort=${sort}`,
});
