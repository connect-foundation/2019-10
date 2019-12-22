import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

import * as S from './styles';
import LatestSVG from '../../svgs/LatestSVG/';
import Layout from '../../components/Layout';
import VideoItem from '../../components/VideoItem';
import CircularProgress from '../../components/CircularProgress';
import { useLatestVideos } from './hook/use-latest-videos';
import { LATEST_VIDEOS_PER_PAGE } from '../../constants';
import VideoListSkeleton from '../../components/VideoListSkeleton';

const Latest: React.FunctionComponent = () => {
  const { videos, hasMore, handleNext } = useLatestVideos();

  return (
    <Layout>
      <S.Container>
        <S.Title>
          <LatestSVG />
          <span>최신 영상</span>
        </S.Title>

        <S.StyledInfiniteScroll
          dataLength={videos.length}
          next={handleNext}
          hasMore={hasMore}
          loader={
            videos.length > 0 ? (
              <CircularProgress size={28} thickness={4.5} />
            ) : (
              <S.ContainerGrid container spacing={2}>
                <VideoListSkeleton count={LATEST_VIDEOS_PER_PAGE} md={3} />
              </S.ContainerGrid>
            )
          }
        >
          {videos.length > 0 && (
            <S.ContainerGrid container spacing={2}>
              {videos.map(video => (
                <Grid key={video.id} item xs={12} md={3}>
                  <VideoItem {...video} />
                </Grid>
              ))}
            </S.ContainerGrid>
          )}
        </S.StyledInfiniteScroll>
      </S.Container>
    </Layout>
  );
};

export default Latest;
