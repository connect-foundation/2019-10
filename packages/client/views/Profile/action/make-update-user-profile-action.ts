import { Action } from 'react-fetching-library';

import { endpoint } from '../../../constants';

export const makeUpdateUserProfileAction: Action = ({
  id,
  username,
  description,
}) => ({
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: { username, description },
  endpoint: `${process.env.API_SERVER_URL}${endpoint.users}/${id}`,
});
