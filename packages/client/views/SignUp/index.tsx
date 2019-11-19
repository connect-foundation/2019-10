import React, { useState } from 'react';
import * as S from './styles';
import { maxLength } from '../../constants';

const SignUp: React.FunctionComponent = () => {
  const [formData, setFormData] = useState({
    username: '',
    description: '',
    isAgreed: false,
  });

  const [isFetching, setisFetching] = useState(false);

  const handleUsername = e => {
    setFormData({ ...formData, username: e.target.value });
  };

  const handleIntroduction = e => {
    setFormData({ ...formData, description: e.target.value });
  };

  const handleTermsCheckbox = e => {
    setFormData({ ...formData, isAgreed: !formData.isAgreed });
  };

  const handleSubmitButton = e => {
    setisFetching(true);
  };

  const checkFormVerified = () => {
    if (isFetching) {
      return true;
    }
    return !(formData.isAgreed && formData.username);
  };

  return (
    <S.SignUp>
      <S.Container>
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
              maxLength={maxLength.username}
              onChange={handleUsername}
              type="text"
            />
          </S.Item>
          <S.Item>
            <S.Label>
              <label htmlFor="description">소개</label>
              <span>(최대 1,500자)</span>
            </S.Label>
            <textarea
              maxLength={maxLength.introduction}
              onChange={handleIntroduction}
            />
          </S.Item>
          <S.Item>
            <S.Label>
              <input onChange={handleTermsCheckbox} type="checkbox" />
              <div className={'agreement'}>
                <u>서비스 약관</u>에 동의합니다.
              </div>
            </S.Label>
          </S.Item>
          <S.SubmitButton>
            <button disabled={checkFormVerified()} onClick={handleSubmitButton}>
              가입하기
            </button>
          </S.SubmitButton>
        </S.Form>
      </S.Container>
    </S.SignUp>
  );
};

export default SignUp;
