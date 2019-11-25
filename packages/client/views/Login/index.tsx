import React from 'react';
import * as S from './styles';
import { LogoSVG, GitHubSVG } from '../../svgs';
import Grid from '@material-ui/core/Grid';

const Login: React.FunctionComponent = () => {
  return (
    <S.Login>
      <S.ContainerGrid container justify="center">
        <Grid item xs={12} md={8}>
          <S.Logo>
            <LogoSVG width={208} height={55} />
          </S.Logo>
          <S.Message>
            wedev에 오신것을 환영합니다! <br />
            <br />
            wedev는 개발자를 위한 동영상 커뮤니티에요. <br />
            커뮤니티에 가입하고, 여러분의 소중한 개발 경험을 공유해 주세요!
          </S.Message>
          <S.Link>
            <S.AuthenticateLink href="#">
              <GitHubSVG />
              <span>GitHub 계정으로 로그인/회원가입</span>
            </S.AuthenticateLink>
          </S.Link>
        </Grid>
      </S.ContainerGrid>
    </S.Login>
  );
};

export default Login;
