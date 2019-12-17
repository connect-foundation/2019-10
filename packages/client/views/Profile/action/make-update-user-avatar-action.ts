import { Action } from 'react-fetching-library';

import { endpoint } from '../../../constants';

export const makeUpdateUserAvatarAction: Action = ({ id, avatar }) => ({
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: { avatar },
  endpoint: `${process.env.API_SERVER_URL}${endpoint.users}/${id}`,
});
