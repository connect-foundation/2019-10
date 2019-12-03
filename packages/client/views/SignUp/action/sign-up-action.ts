import { FormData } from '../model/form-data';
import { endpoint } from '../../../constants';
import { Action } from 'react-fetching-library';

export const makeSignUpAction: Action = (formData: FormData) => ({
  method: 'POST',
  endpoint: `${process.env.API_URL_HOST}${endpoint.users}`,
  body: formData,
  credentials: 'include',
});