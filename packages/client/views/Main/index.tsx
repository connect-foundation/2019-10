import React from 'react';
import Grid from '@material-ui/core/Grid';

import * as S from './styles';
import HotlistSVG from '../../svgs/HotlistSVG/';
import Layout from '../../components/Layout';
import Video from '../../components/Video';

const Main: React.FunctionComponent = () => {
  return (
    <Layout>
      <S.Container>
        <S.Title>
          <HotlistSVG />
          <span>핫 리스트</span>
        </S.Title>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Video />
          </Grid>
          <Grid item xs={12}>
            <Video />
          </Grid>
          <Grid item xs={12}>
            <Video />
          </Grid>
          <Grid item xs={12}>
            <Video />
          </Grid>
        </Grid>
      </S.Container>
    </Layout>
  );
};

export default Main;
