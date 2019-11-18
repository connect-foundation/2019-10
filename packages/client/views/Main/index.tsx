import React from 'react';
import Grid from '@material-ui/core/Grid';

import * as S from './styles';
import Layout from '../../components/Layout';
import Video from '../../components/Video';
import { HotlistSVG } from '../../svgs';

const Main: React.FunctionComponent = () => {
  return (
    <Layout>
      <S.Container>
        <S.Title>
          <HotlistSVG />
          <span>핫 리스트</span>
        </S.Title>
        <S.ContainerGrid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Video />
          </Grid>
          <Grid item xs={12} md={4}>
            <Video />
          </Grid>
          <Grid item xs={12} md={4}>
            <Video />
          </Grid>
          <Grid item xs={12} md={4}>
            <Video />
          </Grid>
        </S.ContainerGrid>
      </S.Container>
    </Layout>
  );
};

export default Main;
