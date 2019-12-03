import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

import { periodOptions } from '../../constants';

import * as S from './styles';

import HotlistSVG from '../../svgs/HotlistSVG/';
import Layout from '../../components/Layout';
import VideoItem from '../../components/VideoItem';
import CircularProgress from '../../components/CircularProgress';

import { useHotlistVideos } from './hooks';

const Hotlist: React.FunctionComponent = () => {
  const [activePeriod, setActivePeriod] = useState(periodOptions[0].value);
  const [page, setPage] = useState(1);

  const { videos, hasMore } = useHotlistVideos(page, activePeriod);

  const handleFilterClick = value => {
    setActivePeriod(value);
    setPage(1);
  };

  const handlePageChange = () => {
    setPage(page + 1);
  };

  return (
    <Layout>
      <S.Container>
        <S.Title>
          <HotlistSVG />
          <span>핫 리스트</span>
        </S.Title>

        <S.StyledTabs
          items={periodOptions}
          activeValue={activePeriod}
          onClick={handleFilterClick}
        />

        <S.StyledInfiniteScroll
          dataLength={videos.length}
          next={handlePageChange}
          hasMore={hasMore}
          loader={<CircularProgress size={28} thickness={4.5} />}
        >
          <S.ContainerGrid container spacing={2}>
            {videos.map(video => {
              return (
                <Grid key={video.id} item xs={12} md={3}>
                  <VideoItem {...video} />
                </Grid>
              );
            })}
          </S.ContainerGrid>
        </S.StyledInfiniteScroll>
      </S.Container>
    </Layout>
  );
};

export default Hotlist;
