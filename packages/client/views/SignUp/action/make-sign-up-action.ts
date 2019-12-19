import { Action } from 'react-fetching-library';

import { endpoint } from '../../../constants';
import { SignUpFormDTO } from '../dto/sign-up-form-dto';

export const makeSignUpAction: Action = (formData: SignUpFormDTO) => ({
  method: 'POST',
  endpoint: `${process.env.API_SERVER_URL}${endpoint.users}`,
  body: formData,
  credentials: 'include',
});
