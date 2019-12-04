import React from 'react';
import Grid from '@material-ui/core/Grid';

import Layout from '../../components/Layout';
import * as S from './styles';
import CloudSVG from '../../svgs/CloudSVG';

const VideoFileUpload: React.FunctionComponent = () => {
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

export default VideoFileUpload;
