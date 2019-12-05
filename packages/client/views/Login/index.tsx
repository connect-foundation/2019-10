import React from 'react';
import Grid from '@material-ui/core/Grid';

import AppBar from '../../components/AppBar';
import * as S from './styles';
import { GitHubSVG } from '../../svgs';

const Login: React.FunctionComponent = () => {
  return (
    <>
      <AppBar showSearchBar={false} showButtons={false} />
      <S.Login>
        <S.Container>
          <S.ContainerGrid container justify="center">
            <Grid item xs={12} md={8}>
              <S.Title>
                개발자를 위한
                <br /> 동영상 커뮤니티.
              </S.Title>
              <S.Message>
                위데브에 오신것을 환영합니다! <br />
                여러분의 소중한 개발 경험을 공유하고, 양질의 개발 영상을
                시청하세요!
              </S.Message>
              <S.Link>
                <S.AuthenticateLink
                  href={
                    process.env.GITHUB_REQUEST_USER_IDENTITY_URL +
                    `?client_id=${process.env.GITHUB_CLIENT_ID}`
                  }
                >
                  <GitHubSVG />
                  <span>GitHub 계정으로 로그인/회원가입</span>
                </S.AuthenticateLink>
              </S.Link>
            </Grid>
          </S.ContainerGrid>
        </S.Container>
      </S.Login>
    </>
  );
};

export default Login;
