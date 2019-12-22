import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router';

import * as S from './style';
import TagsSVG from '../../svgs/TagsSVG';
import { SORT_OPTION } from '../../constants';
import Layout from '../../components/Layout';
import VideoItem from '../../components/VideoItem';
import CircularProgress from '../../components/CircularProgress';
import { useTag } from './hook/use-tag';
import { useTaggedVideos } from './hook/use-tagged-videos';

const TagVideos: React.FunctionComponent = () => {
  const { tag } = useTag();

  const {
    taggedVideos,
    handleFilterClick,
    handlePageChange,
    sort,
    hasMore,
  } = useTaggedVideos();

  return (
    <Layout>
      <S.Container>
        <S.Title>
          <TagsSVG />
          <span>{tag.name !== null && tag.name}</span>
        </S.Title>
        <S.StyledTabs
          items={SORT_OPTION}
          activeValue={sort}
          onClick={handleFilterClick}
        />

        <S.StyledInfiniteScroll
          dataLength={taggedVideos.length}
          next={handlePageChange}
          hasMore={hasMore}
          loader={<CircularProgress size={28} thickness={4.5} />}
        >
          <S.ContainerGrid container spacing={2}>
            {taggedVideos.map(video => {
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
