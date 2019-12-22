import Grid from '@material-ui/core/Grid';
import React from 'react';

import * as S from './style';
import { useTag } from './hook/use-tag';
import TagsSVG from '../../svgs/TagsSVG';
import Layout from '../../components/Layout';
import { SORT_OPTION } from '../../constants';
import VideoItem from '../../components/VideoItem';
import { useTaggedVideos } from './hook/use-tagged-videos';
import CircularProgress from '../../components/CircularProgress';

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
