import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

import * as S from './styles';
import Layout from '../../components/Layout';
import { useTags } from './hooks';
import CircularProgress from '../../components/CircularProgress';
import { Tag } from './interface/tag';
import { chunkList } from '../../libs/chunkList';

const getOneTag = (tag: Tag) => {
  const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <Grid key={tag.id} item xs={6} md={3}>
      <S.Tag>
        <S.TagTitle>{tag.name}</S.TagTitle>
        <S.TagCount>{numberWithCommas(tag.videosCount)}</S.TagCount>
      </S.Tag>
    </Grid>
  );
};

const getOneLineOfTags = (tags: Tag[], index: number) => {
  return (
    <S.ContainerGrid key={index} container spacing={2} justify={'flex-start'}>
      {tags.map(getOneTag)}
    </S.ContainerGrid>
  );
};

const getTagList = (tags: Tag[]) => {
  const chunckedTags = chunkList(tags, 4);
  return <>{chunckedTags.map(getOneLineOfTags)}</>;
};

const TagList: React.FunctionComponent = () => {
  const [page, setPage] = useState(1);

  const { tags, hasMore } = useTags(page);

  const handlePageChange = () => {
    setPage(page + 1);
  };

  return (
    <Layout>
      <S.TagList>
        <S.ContainerGrid container spacing={0} justify="center">
          <Grid item xs={12} md={8}>
            <S.StyledInfiniteScroll
              dataLength={tags.length}
              next={handlePageChange}
              hasMore={hasMore}
              loader={<CircularProgress size={28} thickness={4.5} />}
            >
              {getTagList(tags)}
            </S.StyledInfiniteScroll>
          </Grid>
        </S.ContainerGrid>
      </S.TagList>
    </Layout>
  );
};

export default TagList;
