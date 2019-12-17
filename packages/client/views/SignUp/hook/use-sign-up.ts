import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-fetching-library';

import {
  validateUsername,
  validateDescription,
  validateUsernameDuplicate,
} from '../helper/validate';
import { endpoint } from '../../../constants';
import { UserFormState } from '../model/user-form-state';
import { useDebounce } from '../../../hooks/use-debounce';
import { makeGetUserAction } from '../action/make-get-user';
import { makeSignUpAction } from '../action/make-sign-up-action';
import { SignUpFormDTOFactory } from '../dto/sign-up-form-dto-factory';
import { UserFormValidationState } from '../model/user-form-validation-state';
import { DuplicationValidationState } from '../model/duplication-check-state';
import { ValidationState } from '../../../libs/validation-state/validation-state';

export const useSignUp = () => {
  const router = useRouter();
  const [userFormState, setUserFormState] = useState(
    new UserFormState('', '', true),
  );

  const [userFormValidationState, setUserFormValidationState] = useState(
    new UserFormValidationState(),
  );
  const [duplicationValidationState, setDuplicationValidationState] = useState(
    new DuplicationValidationState(),
  );
  const isFormValidated = Object.keys(userFormValidationState).every(state => {
    return Boolean(userFormValidationState[state].isValid);
  });
  const isNotDuplicated = Object.keys(duplicationValidationState).every(
    state => {
      return Boolean(duplicationValidationState[state].isValid);
    },
  );

  const debouncedUsername = useDebounce(userFormState.username, 500);
  const getUserAction = makeGetUserAction(debouncedUsername);
  const { query } = useQuery(getUserAction, false);

  useEffect(() => {
    if (!userFormValidationState.username.isValid) {
      return;
    }

    const checkDuplicate = async () => {
      setDuplicationValidationState(new DuplicationValidationState());
      const usernameValidationState = await validateUsernameDuplicate(
        debouncedUsername,
        query,
      );

      setDuplicationValidationState({
        username: usernameValidationState,
      });
    };

    checkDuplicate();
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

    setUserFormValidationState({
      ...userFormValidationState,
      [name]: validate(value),
    });
  };

  const changeUserName = e => changeUserForm(e, validateUsername);
  const changeDescription = e => changeUserForm(e, validateDescription);

  const signUpAction = makeSignUpAction(
    SignUpFormDTOFactory.makeSignUpFormDTO(
      userFormState.username,
      userFormState.description,
    ),
  );

  const { query: createUser } = useQuery(signUpAction, false);

  const isSubmitable = isFormValidated && isNotDuplicated;

  const submitUserForm = async e => {
    const { error } = await createUser();

    if (error) {
      // handle Error
      return;
    }

    router.push(endpoint.hotlist);
  };

  return {
    userFormValidationState,
    duplicationValidationState,
    changeUserName,
    changeDescription,
    isSubmitable,
    submitUserForm,
  };
};
