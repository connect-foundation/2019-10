import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router';

import * as S from './styles';
import { sortOptions, endpoint } from '../../constants';
import TagsSVG from '../../svgs/TagsSVG';
import Layout from '../../components/Layout';
import VideoItem from '../../components/VideoItem';
import CircularProgress from '../../components/CircularProgress';
import { NATURAL_NUMBER_REGEX } from '../../libs/regex';
import { useTag } from './hook/use-tag';
import { useTagVideos } from './hook/use-tag-videos';

const TagVideos: React.FunctionComponent = () => {
  const router = useRouter();
  const { tagId } = router.query;
  const validatedTagId = NATURAL_NUMBER_REGEX.test(tagId.toString())
    ? Number(tagId)
    : null;

  const [activeSortOption, setActiveSortOption] = useState(
    sortOptions[0].value,
  );
  const [page, setPage] = useState(1);

  const { tag, error } = useTag(validatedTagId);
  const { videos, hasMore } = useTagVideos(
    validatedTagId,
    page,
    activeSortOption,
  );

  useEffect(() => {
    if (!tagId || error) {
      router.push(endpoint.hotlist);
    }
  }, [error]);

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
