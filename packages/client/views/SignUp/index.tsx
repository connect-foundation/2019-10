import React from 'react';
import { Grid } from '@material-ui/core';

import * as S from './styles';
import { signUpFormDataMaxLength } from '../../constants';
import { useSignUp } from './hook/use-sign-up';

const SignUp: React.FunctionComponent = () => {
  const {
    userFormState,
    userFormValidationState,
    changeUserForm,
    changeUserName,
    changeDescription,
    isSubmitable,
    submitUserForm,
  } = useSignUp();

  return (
    <S.SignUp>
      <S.Container>
        <S.ContainerGrid container justify="center">
          <Grid item xs={12} md={6}>
            <S.HeadMessage>거의 다 되었어요!</S.HeadMessage>
            <S.Form>
              <S.Item>
                <S.Label valid={userFormValidationState.username.isValid}>
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
                  type="text"
                  spellCheck={false}
                />
                <span>{userFormValidationState.username.message}</span>
              </S.Item>
              <S.Item>
                <S.Label valid={userFormValidationState.description.isValid}>
                  <label htmlFor="description">소개</label>
                  <span>(최대 1,500자)</span>
                </S.Label>
                <textarea
                  id="description"
                  name="description"
                  maxLength={signUpFormDataMaxLength.description}
                  onChange={changeDescription}
                  spellCheck={false}
                />
                <span>{userFormValidationState.description.message}</span>
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
                <button disabled={!isSubmitable} onClick={submitUserForm}>
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
