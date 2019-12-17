import { useMutation, useQuery } from 'react-fetching-library';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';

import { endpoint } from '../../../constants';
import { useUser } from '../../../components/UserProvider/hooks';
import { makeQueryUserInfoAction } from '../action/make-query-user-info-action';
import { makeUpdateUserAvatarAction } from '../action/make-update-user-avatar-action';
import { makeUpdateUserProfileAction } from '../action/make-update-user-profile-action';
import { makeUploadAvatarToBucketAction } from '../action/make-upload-avatar-to-bucket-action';
import { makeGetAvatarPreSignedURLAction } from '../action/make-get-avatar-pre-signed-url-action';
import { UserProfileState } from '../model/user-profile-state';

export const useProfile = () => {
  const user = useUser();
  const router = useRouter();

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

  const userId = user ? user.id : 16;
  const queryUserInfoAction = makeQueryUserInfoAction(userId);
  const { query } = useQuery(queryUserInfoAction, false);

  useEffect(() => {
    const initialize = async () => {
      // if (!user) {
      //   router.push(endpoint.hotlist);
      // }

      const { error: userUndefinedError, payload } = await query();

      if (userUndefinedError) {
        // Error Control
        return;
      }

      const { id, username, description, avatar }: UserProfileState = payload;

      setUserProfile(new UserProfileState(id, avatar, username, description));
    };

    initialize();
  }, []);

  const [isAvatarFetching, setIsAvatarFetching] = useState(false);
  const [isFormFetching, setIsFormFetching] = useState(false);

  const getAvatarPreSignedUrl = useMutation(makeGetAvatarPreSignedURLAction)
    .mutate;
  const uploadAvatarToBucket = useMutation(makeUploadAvatarToBucketAction)
    .mutate;
  const changeUserAvatar = useMutation(makeUpdateUserAvatarAction).mutate;
  const changeUserProfile = useMutation(makeUpdateUserProfileAction).mutate;

  const handleAvatarSubmit = async e => {
    setIsAvatarFetching(true);

    const avatarFile = e.target.files[0];
    if (!avatarFile) {
      // Error Control
      return;
    }
    const avatarFileName = `${v4()}/${avatarFile.name}`;

    const {
      payload: avatarPreSignedURL,
      error: AvatarPreSignedUrlError,
    } = await getAvatarPreSignedUrl(avatarFileName);

    if (AvatarPreSignedUrlError) {
      // Error Control
      return;
    }

    const { error: AvatarToBucketError } = await uploadAvatarToBucket({
      preSignedUrl: avatarPreSignedURL,
      file: avatarFile,
    });

    if (AvatarToBucketError) {
      // Error Control
      return;
    }

    const url = `${process.env.AVATAR_SOURCE_HOST}/${avatarFileName}`;

    const {
      payload: changedUser,
      error: changeUserAvatarError,
    } = await changeUserAvatar({ id: userProfile.id, avatar: url });

    const isUserAvatarChanged = !changeUserAvatarError && changedUser;
    if (!isUserAvatarChanged) {
      // Error Control
      return;
    }

    setIsAvatarFetching(false);
    setUserProfile({
      ...userProfile,
      avatar: url,
    });
  };

  const handleFormSubmit = async e => {
    setIsFormFetching(true);

    const { payload, error } = await changeUserProfile({
      id: userProfile.id,
      username: userProfile.username,
      description: userProfile.description,
    });

    if (error || !payload) {
      // Error Control
      setIsFormFetching(false);
      return;
    }

    setIsFormFetching(false);
  };

  return {
    userProfile,
    handleUsername,
    handleAvatarSubmit,
    handleDescription,
    handleFormSubmit,
    isAvatarFetching,
    isFormFetching,
  };
};
