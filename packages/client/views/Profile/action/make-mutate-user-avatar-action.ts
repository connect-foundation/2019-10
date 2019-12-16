import { Action } from 'react-fetching-library';

import { endpoint } from '../../../constants';

export const makeMutateUserAvatarAction: Action = ({ id, avatar }) => ({
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: { avatar },
  endpoint: `${process.env.API_SERVER_HOST}${endpoint.users}/${id}`,
});
