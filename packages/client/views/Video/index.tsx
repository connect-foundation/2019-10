import React from 'react';
import { Grid } from '@material-ui/core';

import * as S from './styles';

import Layout from '../../components/Layout';
import VideoInfo from '../../components/VideoInfo';
import VideoMeta from '../../components/VideoMeta';
const Video = () => {
  return (
    <Layout drawer={false}>
      <S.Video>
        <video controls>
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
          <source
            src="https://www.w3schools.com/html/mov_bbb.ogg"
            type="video/ogg"
          />
        </video>
      </S.Video>
      <S.Details>
        <Grid container justify="center">
          <Grid item xs={12} md={8}>
            <VideoInfo />
            <VideoMeta />
          </Grid>
        </Grid>
      </S.Details>
    </Layout>
  );
};

export default Video;
