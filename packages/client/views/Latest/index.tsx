import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

import * as S from './styles';
import LatestSVG from '../../svgs/LatestSVG/';
import Layout from '../../components/Layout';
import VideoItem from '../../components/VideoItem';
import CircularProgress from '../../components/CircularProgress';
import { useLatestVideos } from './hooks';

const Latest: React.FunctionComponent = () => {
  const [page, setPage] = useState(1);

  const { videos, hasMore } = useLatestVideos(page);

  const handlePageChange = () => {
    setPage(page + 1);
  };

  return (
    <Layout>
      <S.Container>
        <S.Title>
          <LatestSVG />
          <span>최신 영상</span>
        </S.Title>

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

export default Latest;
