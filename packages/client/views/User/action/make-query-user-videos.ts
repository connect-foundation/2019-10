import { Action } from 'react-fetching-library';

export const makeQueryUserVideos: Action = (id, page, sort) => ({
  method: 'GET',
  endpoint: `${process.env.API_SERVER_URL}/users/${id}/videos?page=${page}&sort=${sort}`,
});
