import { useContext } from 'react';

import { UserStateContext, UserDispatchContext } from './contexts';

export const useUser = () => useContext(UserStateContext);
export const useUserDispatch = () => useContext(UserDispatchContext);
