import { useMutation, useQuery } from 'react-fetching-library';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';

import { endpoint } from '../../../constants';
import { useUserProfile } from '../hook/use-user-profile';
import { useUser } from '../../../components/UserProvider/hooks';
import { makeQueryUserInfoAction } from '../action/make-query-user-info-action';
import { makeMutateUserAvatarAction } from '../action/make-mutate-user-avatar-action';
import { makeMutateUserProfileAction } from '../action/make-mutate-user-profile-action';
import { makeUploadAvatarToBucketAction } from '../action/make-upload-avatar-to-bucket-action';
import { makeMutateAvatarPreSignedURLAction } from '../action/make-mutate-avatar-pre-signed-url-action';

export const useProfile = () => {
  const user = useUser();
  const router = useRouter();

  const {
    userProfile,
    setUserProfile,
    handleUsername,
    handleDescription,
  } = useUserProfile();

  const id = user ? user.id : 16;
  const queryUserInfoAction = makeQueryUserInfoAction(id);
  const { query } = useQuery(queryUserInfoAction, false);

  useEffect(() => {
    const initialize = async () => {
      if (!user) {
        router.push(endpoint.hotlist);
      }

      const { error, payload } = await query();

      if (error) {
        return;
      }

      const { username, description, avatar } = payload;

      setUserProfile({
        id,
        username,
        description,
        avatar,
      });
    };

    initialize();
  }, []);

  const [isAvatarFetching, setIsAvatarFetching] = useState(false);
  const [isFormFetching, setIsFormFetching] = useState(false);
  const [userAvatarUpdateError, setUserAvatarUpdateError] = useState(false);
  const [userFormUpdateError, setUserFormUpdateError] = useState(false);

  const getAvatarPreSignedUrl = useMutation(makeMutateAvatarPreSignedURLAction)
    .mutate;
  const uploadAvatarToBucket = useMutation(makeUploadAvatarToBucketAction)
    .mutate;
  const changeUserAvatar = useMutation(makeMutateUserAvatarAction).mutate;
  const changeUserProfile = useMutation(makeMutateUserProfileAction).mutate;

  const handleAvatarSubmit = e => {
    setIsAvatarFetching(true);
    if (!e.target.files[0]) {
      return;
    }

    const updateAvatar = async () => {
      const avatarFile = e.target.files[0];
      const avatarFileName = `${v4()}/${avatarFile.name}`;

      const {
        payload: avatarPreSignedURL,
        error: getAvatarPreSignedUrlError,
      } = await getAvatarPreSignedUrl(avatarFileName);

      if (getAvatarPreSignedUrlError) {
        setUserAvatarUpdateError(true);
        return;
      }

      const { error: uploadAvatarToBucketError } = await uploadAvatarToBucket({
        preSignedUrl: avatarPreSignedURL,
        file: avatarFile,
      });

      if (uploadAvatarToBucketError) {
        setUserAvatarUpdateError(true);
        return;
      }

      const url = `${process.env.S3_AVATAR_PATH}/${avatarFileName}`;

      const {
        payload: changedUser,
        error: changeUserAvatarError,
      } = await changeUserAvatar({ id: userProfile.id, avatar: url });

      const isUserAvatarChanged = !changeUserAvatarError && changedUser;
      if (!isUserAvatarChanged) {
        setUserAvatarUpdateError(true);
        return;
      }

      setIsAvatarFetching(false);
      setUserProfile({
        ...userProfile,
        avatar: url,
      });
    };

    updateAvatar();
  };

  const handleFormSubmit = e => {
    setIsFormFetching(true);

    const updateUserForm = async () => {
      const { payload, error } = await changeUserProfile({
        id: userProfile.id,
        username: userProfile.username,
        description: userProfile.description,
      });

      if (error || !payload) {
        setUserFormUpdateError(true);
        setIsFormFetching(false);
        return;
      }

      setIsFormFetching(false);
    };

    updateUserForm();
  };

  return {
    userProfile,
    handleUsername,
    handleAvatarSubmit,
    handleDescription,
    handleFormSubmit,
    isAvatarFetching,
    userAvatarUpdateError,
    userFormUpdateError,
    isFormFetching,
  };
};
