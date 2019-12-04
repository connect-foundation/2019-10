import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router';

import { useUser } from '../../components/UserProvider/hooks';
import Layout from '../../components/Layout';
import * as S from './styles';
import CloudSVG from '../../svgs/CloudSVG';
import { endpoint } from '../../constants';
import { NextComponentType } from 'next';
import {
  checkLogInStatusServerSide,
  checkLogInStatusClientSide,
  redirect,
} from '../../libs/auth';

const VideoFileUpload: NextComponentType = () => {
  const router = useRouter();
  const user = useUser();

  if (checkLogInStatusClientSide(user)) {
    router.push(endpoint.hotlist);
  }

  const fileInput = React.createRef<HTMLInputElement>();

  return (
    <Layout drawer={false}>
      <Grid container spacing={0} justify={'center'}>
        <Grid item xs={12} md={6}>
          <S.Title>
            <CloudSVG />
            <span>영상 업로드</span>
          </S.Title>
          <S.FileContainer>
            <CloudSVG />
            <S.BrowserText>
              업로드 하려는 파일을 끌어다 놓아주세요
            </S.BrowserText>
            <S.MobileText>업로드 하려는 파일을 선택해주세요</S.MobileText>
            <S.UploadButton>
              파일 선택하기
              <S.File ref={fileInput} />
            </S.UploadButton>
          </S.FileContainer>
        </Grid>
      </Grid>
    </Layout>
  );
};

VideoFileUpload.getInitialProps = ({ req, res, isLoggedIn, ...rest }) => {
  if (!checkLogInStatusServerSide(isLoggedIn)) {
    redirect(res, endpoint.hotlist);
  }

  return { ...rest };
};

export default VideoFileUpload;
