import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

import { sortOptions } from '../../constants';

import * as S from './styles';

import TagsSVG from '../../svgs/TagsSVG';
import Layout from '../../components/Layout';
import VideoItem from '../../components/VideoItem';
import CircularProgress from '../../components/CircularProgress';

import { useTagVideos } from './hooks';

const Hotlist: React.FunctionComponent = () => {
  const [activeSortOption, setActiveSortOption] = useState(
    sortOptions[0].value,
  );
  const [page, setPage] = useState(1);

  const { videos, hasMore } = useTagVideos(page, activeSortOption);

  const handleFilterClick = value => {
    setActiveSortOption(value);
    setPage(1);
  };

  const handlePageChange = () => {
    setPage(page + 1);
  };

  return (
    <Layout>
      <S.Container>
        <S.Title>
          <TagsSVG />
          <span>태그 제목</span>
        </S.Title>

        <S.StyledTabs
          items={sortOptions}
          activeValue={activeSortOption}
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
