import React from 'react';
import Grid from '@material-ui/core/Grid';

import * as S from './styles';
import HotlistSVG from '../../svgs/HotlistSVG/';
import SearchSVG from '../../svgs/SearchSVG';

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
            <SearchSVG />
            <span>"Azure cloud" 검색 결과</span>
          </S.Title>
          <S.Subject> 영상 </S.Subject>
          <S.ContainerGrid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Video />
            </Grid>
            <Grid item xs={12} md={3}>
              <Video />
            </Grid>
            <Grid item xs={12} md={3}>
              <Video />
            </Grid>
            <Grid item xs={12} md={3}>
              <Video />
            </Grid>
            <Grid item xs={12} md={3}>
              <Video />
            </Grid>
          </S.ContainerGrid>
        </S.Container>
      </S.Content>
    </S.Layout>
  );
};

export default SearchEx;
