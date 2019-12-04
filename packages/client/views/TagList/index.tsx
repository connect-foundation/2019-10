import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

import * as S from './styles';
import Layout from '../../components/Layout';
import TagItem from '../../components/TagItem';
import { useTags } from './hooks';
import CircularProgress from '../../components/CircularProgress';
import { Tag } from './interface/tag';
import { makeChunkList } from '../../libs/makeChunkList';

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
              {makeChunkList(tags, 4).map((chunkTags: Tag[], index: number) => (
                <S.ContainerGrid
                  key={index}
                  container
                  spacing={2}
                  justify="flex-start"
                >
                  {chunkTags.map(tag => (
                    <Grid key={tag.id} item xs={6} md={3}>
                      <TagItem {...tag} />
                    </Grid>
                  ))}
                </S.ContainerGrid>
              ))}
            </S.StyledInfiniteScroll>
          </Grid>
        </S.ContainerGrid>
      </S.TagList>
    </Layout>
  );
};

export default TagList;
