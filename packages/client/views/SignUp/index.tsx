import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useQuery } from 'react-fetching-library';

import * as S from './styles';
import { signUpFormDataMaxLength, endpoint } from '../../constants';
import { validateUserName, validateDescription } from '../../libs/validate';
import {
  useUserName,
  useDescription,
  useIsAgreed,
  useFormSubmit,
} from './hooks';

const SignUp: React.FunctionComponent = () => {
  const { userName, handleUserNameChange } = useUserName();
  const { description, handleDescriptionChange } = useDescription();
  const { isAgreed, handleIsAgreedChange } = useIsAgreed();

  const [descriptionValidationResult, descriptionMessage] = validateDescription(
    description,
  );
  const [isUserNameDuplicated, setIsUserNameDuplicate] = useState(false);

  const [userNameValidationResult, userNameMessage] = validateUserName(
    userName,
    isUserNameDuplicated,
  );

  const isFormValidated =
    userNameValidationResult && descriptionValidationResult && isAgreed;

  useEffect(() => {
    const checkUserNameDuplicate = async () => {
      const payload = await fetch(
        `${process.env.API_URL_HOST}${endpoint.users}/verify/${userName}`,
      ).then(response => response.json());

      if (payload && payload.username) {
        setIsUserNameDuplicate(true);
      }
    };

    if (userName && isFormValidated && !isUserNameDuplicated) {
      checkUserNameDuplicate();
    } else if (isUserNameDuplicated) {
      setIsUserNameDuplicate(false);
    }
  }, [userName, isAgreed]);

  const { handleSubmit, checkSubmitAvailable } = useFormSubmit(
    userName,
    description,
    isAgreed,
    isFormValidated,
    isUserNameDuplicated,
  );

  return (
    <S.SignUp>
      <S.Container>
        <S.ContainerGrid container justify="center">
          <Grid item xs={12} md={6}>
            <S.HeadMessage>거의 다 되었어요!</S.HeadMessage>
            <S.Form>
              <S.Item>
                <S.Label valid={userNameValidationResult}>
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
                  onChange={handleUserNameChange}
                  type="text"
                  spellCheck={false}
                />
                <span>{userNameMessage}</span>
              </S.Item>
              <S.Item>
                <S.Label valid={descriptionValidationResult}>
                  <label htmlFor="description">소개</label>
                  <span>(최대 1,500자)</span>
                </S.Label>
                <textarea
                  id="description"
                  name="description"
                  maxLength={signUpFormDataMaxLength.description}
                  onChange={handleDescriptionChange}
                  spellCheck={false}
                />
                <span>{descriptionMessage}</span>
              </S.Item>
              <S.Item>
                <S.Label>
                  <input
                    type="checkbox"
                    name="isAgreed"
                    onChange={handleIsAgreedChange}
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
