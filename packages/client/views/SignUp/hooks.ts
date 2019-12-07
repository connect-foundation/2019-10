import { useMutation } from 'react-fetching-library';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FormData } from './model/form-data';
import { makeSignUpAction } from './action/sign-up-action';
import { responseStatus } from '../../response';
import { endpoint } from '../../constants';

export const useUserName = () => {
  const [userName, setUserName] = useState('');

  const handleUserNameChange = e => {
    setUserName(e.target.value);
  };

  return { userName, setUserName, handleUserNameChange };
};

export const useDescription = () => {
  const [description, setDescription] = useState('');

  const handleDescriptionChange = e => {
    setDescription(e.target.value);
  };

  return { description, setDescription, handleDescriptionChange };
};

export const useIsAgreed = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  const handleIsAgreedChange = e => {
    setIsAgreed(e.target.checked);
  };
  return { isAgreed, setIsAgreed, handleIsAgreedChange };
};

export const useFormValidation = (userName: string, description: string) => {
  const [isValidated, setIsValidated] = useState(false);

  return { isValidated };
};

export const useFormSubmit = (
  userName: string,
  description: string,
  isAgreed: boolean,
  validated: boolean,
) => {
  const [isFetching, setIsFetching] = useState(false);

  const formData = new FormData(userName, description, isAgreed);

  const { mutate } = useMutation(makeSignUpAction);
  const router = useRouter();

  const handleSubmit = async e => {
    setIsFetching(true);

    const response = await mutate(formData);

    if (response.status === responseStatus.unprocessableEntity) {
      setIsFetching(false);
      window.alert('이미 가입된 유저입니다.');
    }

    if (response.status === responseStatus.unauthorized) {
      router.push(endpoint.login);
    }

    if (!response.error) {
      router.push(endpoint.hotlist);
    }
  };

  const checkFormVerified = () => {
    return formData.isAgreed && formData.username && validated;
  };

  const checkSubmitAvailable = () => {
    return !isFetching && checkFormVerified();
  };

  return {
    setIsFetching,
    handleSubmit,
    checkFormVerified,
    checkSubmitAvailable,
  };
};
