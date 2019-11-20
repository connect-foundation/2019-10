import React from 'react';
import * as S from './styles';
import { LogoSVG, GitHubSVG } from '../../svgs';

const Login: React.FunctionComponent = () => {
  return (
    <S.Login>
      <S.Container>
        <LogoSVG width={208} height={55} />
        <S.Message>
          wedev에 오신것을 환영합니다! <br />
          <br />
          wedev는 개발자를 위한 동영상 커뮤니티에요. <br />
          커뮤니티에 가입하고, 여러분의 소중한 개발 경험을 공유해 주세요!
        </S.Message>
        <S.AuthenticateLink href="#">
          <GitHubSVG />
          <span>GitHub 계정으로 로그인/회원가입</span>
        </S.AuthenticateLink>
      </S.Container>
    </S.Login>
  );
};

export default Login;
