import React, { useReducer, useContext } from 'react';
import { userActions } from '../../constants';
import { UserDispatchContext, UserStateContext } from './contexts';

const reducer = (state, action) => {
  switch (action.type) {
    case userActions.logout:
      return null;
    default:
      throw new Error(`Unkown action: ${action.type}`);
  }
};

export const UserProvider = ({ children, user }) => {
  const [state, dispatch] = useReducer(reducer, user);
  return (
    <UserDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={state}>
        {children}
      </UserStateContext.Provider>
    </UserDispatchContext.Provider>
  );
};
