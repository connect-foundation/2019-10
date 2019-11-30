import React, { useState } from 'react';
import { useRouter } from 'next/router';

import * as S from './styles';
import { signUpFormDataMaxLength, routePath } from '../../constants';
import { responseStatus } from '../../response';

class FormData {
  public constructor(
    public readonly username: string,
    public readonly description: string,
    public readonly isAgreed: boolean,
  ) {}
}

const SignUp: React.FunctionComponent = () => {
  const [formData, setFormData] = useState(new FormData('', '', false));

  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();

  const handleFormChange = e => {
    const { checked, name, value, type } = e.target;
    const valueToUpdate = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: valueToUpdate,
    });
  };

  const handleSubmit = async e => {
    setIsFetching(true);

    // 실제 요청 보내기
    const response = await submitFormData(formData);

    if (response.status === responseStatus.unprocessableEntity) {
      setIsFetching(false);
      window.alert('중복된 계정입니다');
    }

    if (response.status === responseStatus.unAuthorized) {
      router.push(routePath.login);
    }

    if (response.ok) {
      router.push(routePath.hotlist);
    }
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
              maxLength={signUpFormDataMaxLength.username}
              onChange={handleFormChange}
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
              maxLength={signUpFormDataMaxLength.introduction}
              onChange={handleFormChange}
            />
          </S.Item>
          <S.Item>
            <S.Label>
              <input
                type="checkbox"
                name="isAgreed"
                onChange={handleFormChange}
              />
              <div className={'agreement'}>
                <u>서비스 약관</u>에 동의합니다.
              </div>
            </S.Label>
          </S.Item>
          <S.SubmitButton>
            <button disabled={!checkSubmitAvailable()} onClick={handleSubmit}>
              가입하기
            </button>
          </S.SubmitButton>
        </S.Form>
      </S.Container>
    </S.SignUp>
  );
};

const submitFormData = async (formData: FormData): Promise<Response> => {
  const response = await fetch(process.env.SIGN_UP_API_SERVER_URL, {
    body: JSON.stringify({ ...formData }),
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

export default SignUp;
