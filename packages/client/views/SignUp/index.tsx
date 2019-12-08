import React, { useState, useEffect, useReducer } from 'react';
import { Grid } from '@material-ui/core';
import { useDebounce } from '../../hooks/use-debounce';

import * as S from './styles';
import {
  signUpFormDataMaxLength,
  endpoint,
  debounceTime,
} from '../../constants';
import { validateUserName, validateDescription } from '../../libs/validate';
import { useFormSubmit, userFormReducer, initialUserState } from './hooks';

const SignUp: React.FunctionComponent = () => {
  const [userForm, dispatchUserForm] = useReducer(
    userFormReducer,
    initialUserState,
  );

  const debouncedUserName = useDebounce(
    userForm.userName,
    debounceTime.userName,
  );

  const [isUserNameValid, userNameMessage] = validateUserName(
    debouncedUserName,
    userForm.isUserNameDuplicated,
  );

  useEffect(() => {
    const shouldCheckDuplicated = () => {
      return debouncedUserName && isUserNameValid;
    };

    const checkUserNameDuplicate = async () => {
      const user = await fetch(
        `${process.env.API_URL_HOST}${endpoint.users}/verify/${debouncedUserName}`,
      ).then(response => response.json());

      if (user && user.username) {
        dispatchUserForm({ type: 'updateUserNameDuplicated', value: true });
      }
    };

    if (shouldCheckDuplicated()) {
      checkUserNameDuplicate();
    } else if (userForm.isUserNameDuplicated) {
      dispatchUserForm({ type: 'updateUserNameDuplicated', value: false });
    }
  }, [debouncedUserName]);

  const [isDescriptionValid, descriptionMessage] = validateDescription(
    userForm.description,
  );

  const isFormValid =
    isUserNameValid &&
    isDescriptionValid &&
    userForm.isAgreed &&
    !userForm.isUserNameDuplicated;

  const { handleSubmit, checkSubmitAvailable } = useFormSubmit(
    debouncedUserName,
    userForm.description,
    userForm.isAgreed,
    isFormValid,
  );

  const handleUserName = e =>
    dispatchUserForm({
      type: 'updateUserName',
      value: e.target.value,
    });

  const handleDescription = e =>
    dispatchUserForm({
      type: 'updateDescription',
      value: e.target.value,
    });

  const handleIsAgreed = e =>
    dispatchUserForm({
      type: 'updateIsAgreed',
      value: e.target.checked,
    });

  return (
    <S.SignUp>
      <S.Container>
        <S.ContainerGrid container justify="center">
          <Grid item xs={12} md={6}>
            <S.HeadMessage>거의 다 되었어요!</S.HeadMessage>
            <S.Form>
              <S.Item>
                <S.Label valid={isUserNameValid}>
                  <label htmlFor="username">
                    닉네임
                    <S.RequireMark />
                  </label>
                  <span>(영문, 숫자 또는 한글)</span>
                </S.Label>
                <input
                  id="username"
                  name="username"
                  maxLength={signUpFormDataMaxLength.username}
                  onChange={handleUserName}
                  type="text"
                  spellCheck={false}
                />
                <span>{userNameMessage}</span>
              </S.Item>
              <S.Item>
                <S.Label valid={isDescriptionValid}>
                  <label htmlFor="description">소개</label>
                  <span>(최대 1,500자)</span>
                </S.Label>
                <textarea
                  id="description"
                  name="description"
                  maxLength={signUpFormDataMaxLength.description}
                  onChange={handleDescription}
                  spellCheck={false}
                />
                <span>{descriptionMessage}</span>
              </S.Item>
              <S.Item>
                <S.Label>
                  <input
                    type="checkbox"
                    name="isAgreed"
                    onChange={handleIsAgreed}
                    spellCheck={false}
                  />
                  <div className={'agreement'}>
                    <u>서비스 약관</u>에 동의합니다.
                  </div>
                </S.Label>
              </S.Item>
              <S.SubmitButton>
                <button
                  disabled={!checkSubmitAvailable()}
                  onClick={handleSubmit}
                >
                  가입하기
                </button>
              </S.SubmitButton>
            </S.Form>
          </Grid>
        </S.ContainerGrid>
      </S.Container>
    </S.SignUp>
  );
};

export default SignUp;
