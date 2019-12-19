import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from 'react-fetching-library';

import {
  validateUsername,
  validateDescription,
  makeUsernameDuplicatedMessage,
} from '../helper/validate';
import { UserFormState } from '../model/user-form-state';
import { useDebounce } from '../../../libs/debounce/use-debounce';
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

  const [isFetching, setIsFetching] = useState(false);

  const debouncedUsername = useDebounce(
    userFormState.username,
    DEBOUNCE_TIME.USERNAME,
  );

  const { query: getUserQuery } = useQuery(
    makeQueryUserAction(debouncedUsername),
    false,
  );
  const { mutate: signUp } = useMutation(makeSignUpAction);

  useEffect(() => {
    if (!(userFormValidationStates.username.isValid && debouncedUsername)) {
      return;
    }

    const checkIsDuplicated = async () => {
      const { payload, error } = await getUserQuery();
      const { isDuplicated } = payload;

      if (error) {
        // TODO
      }

      if (!(payload && isDuplicated)) {
        return;
      }

      const username = debouncedUsername;

      setUserFormValidationStates({
        ...userFormValidationStates,
        username: ValidationStateFactory.makeFailValidationState(
          makeUsernameDuplicatedMessage(username),
        ),
      });
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

  const checkSubmitAvailable = () => {
    return !isFetching && checkFormVerified();
  };

  const changeUserName = e => changeUserForm(e, validateUsername);
  const changeDescription = e => changeUserForm(e, validateDescription);

  return {
    userFormValidationStates,
    changeUserName,
    changeDescription,
    checkSubmitAvailable,
    submitUserForm,
  };
};
