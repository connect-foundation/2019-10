import React, { useState } from 'react';
import * as S from './styles';
import { maxLength } from '../../constants';
import Grid from '@material-ui/core/Grid';

const SignUp: React.FunctionComponent = () => {
  const [formData, setFormData] = useState({
    username: '',
    description: '',
    isAgreed: false,
  });

  const [isFetching, setIsFetching] = useState(false);

  const handleChange = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    setIsFetching(true);
  };

  const checkFormVerified = () => {
    return formData.isAgreed && formData.username;
  };

  const checkSubmitAvailable = () => {
    return !isFetching && checkFormVerified();
  };

  return (
    <S.SignUp>
      <S.Container>
        <S.ContainerGrid container justify="center">
          <Grid item xs={12} md={6}>
            <S.HeadMessage>거의 다 되었어요!</S.HeadMessage>
            <S.Form onSubmit={() => null}>
              <S.Item>
                <S.Label>
                  <label htmlFor="username">
                    닉네임
                    <S.RequireMark />
                  </label>
                  <span>(영문, 숫자 또는 한글)</span>
                </S.Label>
                <input
                  id="username"
                  name="username"
                  maxLength={maxLength.username}
                  onChange={handleChange}
                  type="text"
                />
              </S.Item>
              <S.Item>
                <S.Label>
                  <label htmlFor="description">소개</label>
                  <span>(최대 1,500자)</span>
                </S.Label>
                <textarea
                  id="description"
                  name="description"
                  maxLength={maxLength.introduction}
                  onChange={handleChange}
                />
              </S.Item>
              <S.Item>
                <S.Label>
                  <input
                    type="checkbox"
                    name="isAgreed"
                    onChange={handleChange}
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
