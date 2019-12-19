import { Action } from 'react-fetching-library';
import { SERVER_ENDPOINT } from '../../../constants';
import { METHOD } from '../../../fetch-options';

export const makeQueryCurrentUserInfo: Action = () => ({
  method: METHOD.GET,
  endpoint: `${process.env.API_SERVER_URL}${SERVER_ENDPOINT.MYSELF}`,
});
