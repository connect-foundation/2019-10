import fetch from 'isomorphic-unfetch';

import { User } from '../interfaces/User';
import { SERVER_ENDPOINT } from '../../../constants';
import {
  METHOD,
  CREDENTIALS,
  HTTP_HEADERS,
  CONTENT_TYPES,
  AUTHORIZATIONS,
} from '../../../fetch-options';

export const requestCurrentUserInfo = async (
  sessionId: string,
): Promise<User> => {
  const response = await fetch(
    `${process.env.API_SERVER_URL}${SERVER_ENDPOINT.MYSELF}`,
    {
      method: METHOD.GET,
      credentials: CREDENTIALS.SAME_ORIGIN,
      headers: {
        [HTTP_HEADERS.CONTENT_TYPE]: CONTENT_TYPES.APPLICATION_JSON,
        [HTTP_HEADERS.AUTHORIZATION]: `${AUTHORIZATIONS.BEARER} ${sessionId}`,
      },
    },
  );

  const payload = await response.json();

  return payload;
};
