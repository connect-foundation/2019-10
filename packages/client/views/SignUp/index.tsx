import React from 'react';
import { NextComponentType } from 'next';
import { Grid } from '@material-ui/core';

import * as S from './style';
import { redirect } from '../../libs/auth';
import { useSignUp } from './hook/use-sign-up';
import { signUpFormDataMaxLength, endpoint } from '../../constants';

const SignUp: NextComponentType = () => {
  const {
    userFormValidationStates,
    changeUserName,
    changeDescription,
    checkSubmitAvailable,
    submitUserForm,
    userValidationStateMessage,
  } = useSignUp();

  return (
    <S.SignUp>
      <S.Container>
        <S.ContainerGrid container justify="center">
          <Grid item xs={12} md={6}>
            <S.HeadMessage>거의 다 되었어요!</S.HeadMessage>
            <S.Form>
              <S.Item>
                <S.Label valid={userFormValidationStates.username.isValid}>
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
                  onChange={changeUserName}
                  autoComplete="off"
                  type="text"
                  spellCheck={false}
                />
                <span>{userValidationStateMessage}</span>
              </S.Item>
              <S.Item>
                <S.Label valid={userFormValidationStates.description.isValid}>
                  <label htmlFor="description">소개</label>
                  <span>(최대 1,500자)</span>
                </S.Label>
                <textarea
                  id="description"
                  name="description"
                  maxLength={signUpFormDataMaxLength.description}
                  onChange={changeDescription}
                  autoComplete="off"
                  spellCheck={false}
                />
                <span>{userFormValidationStates.description.message}</span>
              </S.Item>
              <S.Item>
                <S.Label>
                  <div className={'agreement'}>
                    가입하기 버튼을 누르면 wedev의 <u>약관</u>,{' '}
                    <u>데이터 정책</u> 및 <u>쿠키 정책</u>에 동의하게 됩니다.
                  </div>
                </S.Label>
              </S.Item>
              <S.SubmitButton>
                <button
                  disabled={!checkSubmitAvailable}
                  onClick={submitUserForm}
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

SignUp.getInitialProps = async ({ req, res, ...rest }) => {
  if (req) {
    redirect(res, endpoint.hotlist);
  }
  return rest;
};

export default SignUp;
