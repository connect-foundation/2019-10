import { Action } from 'react-fetching-library';

import { endpoint } from '../../../constants';

export const getTagAction: Action = (id: number) => ({
  method: 'GET',
  endpoint: `${process.env.API_URL_HOST}${endpoint.tags}/${id}`,
});

export const getTagVideosAction: Action = (
  id: number,
  page: number,
  sort: string,
) => ({
  method: 'GET',
  endpoint: `${process.env.API_URL_HOST}${endpoint.tags}/${id}/videos?page=${page}&sort=${sort}`,
});
