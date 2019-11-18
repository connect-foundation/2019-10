import React from 'react';
import Grid from '@material-ui/core/Grid';

import * as S from './styles';
import HotlistSVG from '../../svgs/HotlistSVG/';

import Search from '../../components/Search';
import Drawer from '../../components/Drawer';
import Video from '../../components/Video';

const SearchEx: React.FunctionComponent = () => {
  return (
    <S.Layout>
      <Search />
      <Drawer />
      <S.Content>
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
      </S.Content>
    </S.Layout>
  );
};

export default SearchEx;
