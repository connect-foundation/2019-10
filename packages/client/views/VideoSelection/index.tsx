import React from 'react';
import Grid from '@material-ui/core/Grid';
import { NextComponentType } from 'next';

import Layout from '../../components/Layout';
import * as S from './styles';
import CloudSVG from '../../svgs/CloudSVG';
import { endpoint, VIDEO_TYPE } from '../../constants';
import {
  checkLogInStatusServerSide,
  redirect,
  onlyMember,
} from '../../libs/auth';
import { useVideoSelection } from './hooks';

const VideoSelection: NextComponentType = () => {
  onlyMember();

  const { Videoinput, showExplorer, changeVideo } = useVideoSelection();

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
            <S.UploadButton onClick={showExplorer}>
              파일 선택하기
              <S.File
                accept={VIDEO_TYPE}
                ref={Videoinput}
                onChange={changeVideo}
              />
            </S.UploadButton>
          </S.FileContainer>
        </Grid>
      </Grid>
    </Layout>
  );
};

VideoSelection.getInitialProps = ({ req, res, isLoggedIn, ...rest }) => {
  if (!checkLogInStatusServerSide(isLoggedIn)) {
    redirect(res, endpoint.hotlist);
  }

  return rest;
};

export default VideoSelection;
