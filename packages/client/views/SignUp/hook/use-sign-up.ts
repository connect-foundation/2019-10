import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-fetching-library';

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
import { SignUpFormDTOFactory } from '../dto/sign-up-form-dto-factory';
import { UserFormValidationStates } from '../model/user-form-validation-states';
import { DuplicationValidationStates } from '../model/duplication-check-states';
import { ValidationState } from '../../../libs/validation-state/validation-state';

export const useSignUp = () => {
  const router = useRouter();
  const [userFormState, setUserFormState] = useState(
    new UserFormState('', '', true),
  );

  const [userFormValidationStates, setUserFormValidationStates] = useState(
    new UserFormValidationStates(),
  );
  const [
    duplicationValidationStates,
    setDuplicationValidationStates,
  ] = useState(new DuplicationValidationStates());
  const isFormValidated = Object.keys(userFormValidationStates).every(state => {
    return Boolean(userFormValidationStates[state].isValid);
  });
  const isNotDuplicated = Object.keys(duplicationValidationStates).every(
    state => {
      return Boolean(duplicationValidationStates[state].isValid);
    },
  );

  const debouncedUsername = useDebounce(
    userFormState.username,
    DEBOUNCE_TIME.USERNAME,
  );
  const getUserAction = makeQueryUserAction(debouncedUsername);
  const { query: getUserQuery } = useQuery(getUserAction, false);

  useEffect(() => {
    if (!userFormValidationStates.username.isValid) {
      return;
    }

    const checkDuplicate = async () => {
      setDuplicationValidationStates(new DuplicationValidationStates());
      const usernameValidationState = await validateUsernameDuplicate(
        debouncedUsername,
        getUserQuery,
      );

      setDuplicationValidationStates({
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

    setUserFormValidationStates({
      ...userFormValidationStates,
      [name]: validate(value),
    });
  };

  const changeUserName = e => changeUserForm(e, validateUsername);
  const changeDescription = e => changeUserForm(e, validateDescription);

  const signUpAction = makeSignUpAction(
    SignUpFormDTOFactory.makeSignUpFormDTO(
      userFormState.username,
      userFormState.description,
      userFormState.isAgreed,
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
    userFormValidationStates,
    duplicationValidationStates,
    changeUserName,
    changeDescription,
    isSubmitable,
    submitUserForm,
  };
};
