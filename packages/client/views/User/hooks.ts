import { Action, useQuery } from 'react-fetching-library';
import { useState, useEffect } from 'react';

const createUserAction: Action = id => ({
  method: 'GET',
  endpoint: `${process.env.API_URL_HOST}/users/${id}`,
});

export const useUser = id => {
  const [hasData, setHasData] = useState(false);
  const [user, setUser] = useState({
    id: '',
    username: '',
    description: '',
    avatar: '',
    createdAt: '',
    updatedAt: '',
  });

  const action = createUserAction(id);
  const { payload, error, ...rest } = useQuery(action);

  useEffect(() => {
    if (payload && !error) {
      setHasData(true);
      setUser(payload);
    }
  }, [payload, error]);

  return {
    user,
    hasData,
    ...rest,
  };
};
