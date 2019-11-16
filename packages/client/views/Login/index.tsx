import React from 'react';
import * as S from './styles';
import LogoSVG from '../../svgs/LogoSVG';
import GitHubSVG from '../../svgs/GitHubSVG';

const Login: React.FunctionComponent = () => {
  return (
    <S.Container>
      <LogoSVG
        style={{
          width: 208,
          height: 'auto',
        }}
      />
      <S.Message>
        wedev에 오신것을 환영합니다! <br />
        <br />
        wedev는 개발자를 위한 동영상 커뮤니티에요. <br />
        커뮤니티에 가입하고, 여러분의 소중한 개발 경험을 공유해 주세요!
      </S.Message>
      <S.AuthenticateButton>
        <GitHubSVG />
        <span>GitHub 계정으로 로그인/회원가입</span>
      </S.AuthenticateButton>
    </S.Container>
  );
};

export default Login;
