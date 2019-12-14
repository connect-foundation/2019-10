import { useMutation } from 'react-fetching-library';
import { useState, useReducer } from 'react';
import { useRouter } from 'next/router';
import { FormData } from './model/form-data';
import { makeSignUpAction } from './action/sign-up-action';
import { RESPONSE_STATUS } from '../../response';
import { endpoint } from '../../constants';

export const initialUserState = {
  userName: '',
  description: '',
  isAgreed: false,
  isUserNameDuplicated: false,
};

export const userFormReducer = (state, action) => {
  switch (action.type) {
    case 'reset': {
      return initialUserState;
    }
    case 'updateUserName': {
      return { ...state, userName: action.value };
    }
    case 'updateDescription': {
      return { ...state, description: action.value };
    }
    case 'updateIsAgreed': {
      return { ...state, isAgreed: action.value };
    }
    case 'updateUserNameDuplicated': {
      return { ...state, isUserNameDuplicated: action.value };
    }
    default: {
      throw new Error(`unexpected action.type: ${action.type}`);
    }
  }
};

export const useFormSubmit = (
  userName: string,
  description: string,
  isAgreed: boolean,
  isFormValid: boolean,
) => {
  const [isFetching, setIsFetching] = useState(false);

  const formData = new FormData(userName, description, isAgreed);

  const { mutate } = useMutation(makeSignUpAction);
  const router = useRouter();

  const handleSubmit = async e => {
    setIsFetching(true);

    const response = await mutate(formData);

    if (response.status === RESPONSE_STATUS.UNPROCESSABLE_ENTITY) {
      setIsFetching(false);
      window.alert('이미 가입된 유저입니다.');
    }

    if (response.status === RESPONSE_STATUS.UNAUTHORIZED) {
      router.push(endpoint.login);
    }

    if (!response.error) {
      router.push(endpoint.hotlist);
    }
  };

  const checkFormVerified = () => {
    return formData.isAgreed && formData.username && isFormValid;
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
