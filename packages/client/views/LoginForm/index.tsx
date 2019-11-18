import React, { useState } from 'react';
import * as S from './styles';

const LoginForm: React.FunctionComponent = () => {
  const [input, setInput] = useState({
    nickname: '',
    agree: false,
  });

  const handleNickname = e => {
    setInput({ ...input, nickname: e.target.value });
  };

  const handlecheck = e => {
    setInput({ ...input, agree: !input.agree });
  };

  const active = input.nickname === '' || !input.agree;

  return (
    <S.LoginForm>
      <S.Container>
        <S.HeadMessage>거의 다 되었어요!</S.HeadMessage>
        <S.Form onSubmit={() => null}>
          <S.Input>
            <S.InputInfo>
              <label htmlFor="nickname">
                닉네임<S.RequireMark></S.RequireMark>
              </label>
              <span>(영문, 숫자 또는 한글)</span>
            </S.InputInfo>
            <input
              onChange={handleNickname}
              type={'text'}
              id="nickname"
            ></input>
          </S.Input>
          <S.Input>
            <S.InputInfo>
              <label htmlFor="introduction">소개</label>
              <span>(최대 1,500자)</span>
            </S.InputInfo>
            <textarea id="introduction"></textarea>
          </S.Input>
          <S.Input>
            <S.InputInfo>
              <input onClick={handlecheck} type="checkbox" id="agree"></input>
              <div className={'agreement'}>
                <u>서비스 약관</u>에 동의합니다.
              </div>
            </S.InputInfo>
          </S.Input>
          <S.SubmitButton>
            <button disabled={active}>가입하기</button>
          </S.SubmitButton>
        </S.Form>
      </S.Container>
    </S.LoginForm>
  );
};

export default LoginForm;
