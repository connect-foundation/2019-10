import { Action } from 'react-fetching-library';

import { endpoint } from '../../../constants';
import { UserFormState } from '../model/user-form-state';

export const makeSignUpAction: Action = (formData: UserFormState) => ({
  method: 'POST',
  endpoint: `${process.env.API_SERVER_URL}${endpoint.users}`,
  body: formData,
});
