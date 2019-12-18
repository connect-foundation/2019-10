import { useContext } from 'react';

import { UserStateContext, UserDispatchContext } from './contexts';
import { User } from '../../views/App/interfaces/User';

export const useUser = (): User => useContext(UserStateContext);
export const useUserDispatch = () => useContext(UserDispatchContext);
