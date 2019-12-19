import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from 'react-fetching-library';

import {
  validateUsername,
  validateDescription,
  validateUsernameDuplicate,
} from '../helper/validate';
import { UserFormState } from '../model/user-form-state';
import { useDebounce } from '../../../hooks/use-debounce';
import { makeQueryUserAction } from '../action/make-query-user';
import { endpoint, DEBOUNCE_TIME } from '../../../constants';
import { makeSignUpAction } from '../action/make-sign-up-action';
import { UserFormValidationStates } from '../model/user-form-validation-states';
import { ValidationState } from '../../../libs/validation-state/validation-state';
import { RESPONSE_STATUS } from '../../../response';
import { ValidationStateFactory } from '../../VideoUpload/helper/validation-state-factory';

export const useSignUp = () => {
  const router = useRouter();

  const [userFormState, setUserFormState] = useState(
    new UserFormState('', '', true),
  );

  const [userFormValidationStates, setUserFormValidationStates] = useState(
    new UserFormValidationStates(),
  );

  // const [duplicationValidationState, setDuplicationValidationState] = useState(
  //   new DuplicationValidationState(),
  // );

  // will be deprecated
  // will be deprecated
  const [isUsernameDuplicated, setIsUsernameDuplicated] = useState(
    ValidationStateFactory.makeSuccessValidationState(),
  );
  const [isFetching, setIsFetching] = useState(false);

  // will be deprecated
  const debouncedUsername = useDebounce(
    userFormState.username,
    DEBOUNCE_TIME.USERNAME,
  );

  // will be deprecated
  const getUserAction = makeQueryUserAction(debouncedUsername);
  const { query: getUserQuery } = useQuery(getUserAction, false);

  // will be deprecated
  useEffect(() => {
    if (!userFormValidationStates.username.isValid) {
      return;
    }

    const checkIsDuplicated = async () => {
      // setIsUsernameDuplicated(snew DuplicationValidationState());

      const usernameValidationState = await validateUsernameDuplicate(
        debouncedUsername, // will be deprecated
        getUserQuery,
      );

      setIsUsernameDuplicated(usernameValidationState);
    };

    checkIsDuplicated();
  }, [debouncedUsername]);

  const changeUserForm = (
    e: React.ChangeEvent<HTMLInputElement>,
    validate: (value: string) => ValidationState,
  ) => {
    const { name, value } = e.target;

    setUserFormState({
      ...userFormState,
      [name]: value,
    });

    setUserFormValidationStates({
      ...userFormValidationStates,
      [name]: validate(value),
    });
  };

  const { mutate: signUp } = useMutation(makeSignUpAction);

  const submitUserForm = async e => {
    setIsFetching(true);

    const { error, status } = await signUp(userFormState);

    if (status === RESPONSE_STATUS.UNPROCESSABLE_ENTITY) {
      setIsFetching(false);

      // will be deprecated
      window.alert('이미 가입된 유저입니다.');
    }

    if (status === RESPONSE_STATUS.UNAUTHORIZED) {
      router.push(endpoint.login);
    }

    if (error) {
      // handle Error
      return;
    }

    window.location.href = endpoint.hotlist;
  };

  const checkFormVerified = () => {
    return Object.keys(userFormValidationStates).every(state => {
      return userFormValidationStates[state].isValid;
    });
  };

  const checkUsernameDuplicated = () => {
    Object.keys(isUsernameDuplicated).every(state => {
      return isUsernameDuplicated[state].isValid;
    });
  };

  const checkSubmitAvailable = () => {
    return !isFetching && checkFormVerified() && checkUsernameDuplicated();
  };

  const changeUserName = e => changeUserForm(e, validateUsername);
  const changeDescription = e => changeUserForm(e, validateDescription);

  const userValidationStateMessage = userFormValidationStates.username.message
    ? userFormValidationStates.username.message
    : isUsernameDuplicated.message;

  return {
    userFormValidationStates,
    isUsernameDuplicated,
    changeUserName,
    changeDescription,
    checkSubmitAvailable,
    submitUserForm,
    userValidationStateMessage,
  };
};
