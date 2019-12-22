import { Action } from 'react-fetching-library';
import { SERVER_ENDPOINT, METHOD, VIDEOS } from '../../../constants';

export const makeIncreaseViewAction: Action = (videoId: number) => ({
  method: METHOD.PATCH,
  endpoint: `${process.env.API_SERVER_URL}${VIDEOS}/${videoId}${SERVER_ENDPOINT.INCREASE_VIEWS}`,
});
