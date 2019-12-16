import { useState } from 'react';

import { UserProfileState } from '../model/user-profile-state';

export const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState(
    new UserProfileState(0, '', '', ''),
  );

  const handleUsername = e => {
    setUserProfile({
      ...userProfile,
      username: e.target.value,
    });
  };

  const handleDescription = e => {
    setUserProfile({
      ...userProfile,
      description: e.target.value,
    });
  };

  return {
    userProfile,
    setUserProfile,
    handleUsername,
    handleDescription,
  };
};
