import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

import { hotlistFilters } from '../../constants';

import * as S from './styles';

import { useHotlistVideos } from './hooks';

import HotlistSVG from '../../svgs/HotlistSVG/';
import Layout from '../../components/Layout';
import VideoItem from '../../components/VideoItem';

const Hotlist: React.FunctionComponent = () => {
  const [activeFilterValue, setActiveFilterValue] = useState(
    hotlistFilters[0].value,
  );

  const { data: videos, isLoading, error } = useHotlistVideos(
    1,
    activeFilterValue,
  );

  const handleFilterClick = value => {
    setActiveFilterValue(value);
  };

  return (
    <Layout>
      <S.Container>
        <S.Title>
          <HotlistSVG />
          <span>핫 리스트</span>
        </S.Title>

        <S.StyledFilters
          filters={hotlistFilters}
          activeValue={activeFilterValue}
          onClick={handleFilterClick}
        />

        <S.ContainerGrid container spacing={2}>
          {!isLoading && !error && videos
            ? videos.map(video => {
                return (
                  <Grid key={video.id} item xs={12} md={3}>
                    <VideoItem {...video} />
                  </Grid>
                );
              })
            : null}
        </S.ContainerGrid>
      </S.Container>
    </Layout>
  );
};

export default Hotlist;
