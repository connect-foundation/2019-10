import { useRouter } from 'next/router';
import { makeQueryUserProfile } from '../action/make-query-user-profile';
import { useQuery } from 'react-fetching-library';
import { useEffect, useState } from 'react';

export const useUserProfile = () => {
  const router = useRouter();
  const { userId } = router.query;

  const [user, setUser] = useState(null);

  const action = makeQueryUserProfile(userId);
  const state = useQuery(action, false);

  useEffect(() => {
    const fetch = async () => {
      const data = await state.query();
      if (!data.payload || data.error) {
        return;
      }
      setUser(data.payload);
    };
    fetch();
  }, []);

  return {
    user,
  };
};
