import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router';

import * as S from './style';
import TagsSVG from '../../svgs/TagsSVG';
import { sortOptions } from '../../constants';
import Layout from '../../components/Layout';
import VideoItem from '../../components/VideoItem';
import { useTagVideos } from './hook/use-tag-videos';
import CircularProgress from '../../components/CircularProgress';

const TagVideos: React.FunctionComponent = () => {
  const {
    tag,
    videos,
    handleFilterClick,
    handlePageChange,
    activeSortOption,
    hasMore,
  } = useTagVideos();

  return (
    <Layout>
      <S.Container>
        <S.Title>
          <TagsSVG />
          <span>{tag.name !== null && tag.name}</span>
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

export default TagVideos;
