import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-fetching-library';

import { endpoint } from '../../../constants';
import { UserFormState } from '../model/user-form-state';
import { makeSignUpAction } from '../action/make-sign-up-action';
import { validateUsername, validateDescription } from '../helper/validate';
import { UserFormValidationState } from '../model/user-form-validation-state';
import { ValidationState } from '../../../libs/validation-state/validation-state';
import { SignUpFormDTOFactory } from '../dto/sign-up-form-dto-factory';

export const useSignUp = () => {
  const router = useRouter();
  const [userFormState, setUserFormState] = useState(
    new UserFormState('', '', true),
  );

  const [userFormValidationState, setUserFormValidationState] = useState(
    new UserFormValidationState(),
  );

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

  const submitUserForm = async e => {
    const { payload, error } = await createUser();

    if (error) {
      // handle Error
      return;
    }

    router.push(endpoint.hotlist);
  };

  const isValidated = Object.keys(userFormValidationState).every(state => {
    return Boolean(userFormValidationState[state].isValid);
  });

  const isSubmitable = isValidated;

  return {
    userFormState,
    userFormValidationState,
    changeUserForm,
    changeUserName,
    changeDescription,
    isSubmitable,
    submitUserForm,
  };
};
