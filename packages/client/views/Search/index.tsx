import React from 'react';
import { useRouter } from 'next/router';

import Grid from '@material-ui/core/Grid';

import * as S from './styles';

import Layout from '../../components/Layout';
import {
  SearchedVideos,
  SearchedUsers,
  SearchedTags,
  SearchedTitle,
  ViewMore,
} from '../../components/Searched';

import { endpoint, searchOptions } from '../../constants';
import { useSearchVideos, useSearchUsers, useSearchTags } from './hooks';

const Searched: React.FunctionComponent = () => {
  const router = useRouter();
  const searchKeyword = router.query.keyword;

  const activeSearch = searchOptions[0].value;

  const page = undefined;

  const { videos } = useSearchVideos(page, searchKeyword);
  const { users } = useSearchUsers(page, searchKeyword);
  const { tags } = useSearchTags(page, searchKeyword);

  const routerObject = (queryKeyword, num) => ({
    pathname: `${endpoint.search}/${searchOptions[num].value}`,
    query: { keyword: queryKeyword },
  });

  const handleFilterClick = value => {
    if (value === searchOptions[1].value) {
      router.push(routerObject(searchKeyword, 1));
    }
    if (value === searchOptions[2].value) {
      router.push(routerObject(searchKeyword, 2));
    }
    if (value === searchOptions[3].value) {
      router.push(routerObject(searchKeyword, 3));
    }
  };

  return (
    <Layout drawer={false}>
      <S.Container>
        <S.ContainerGrid container spacing={2} justify="center">
          <Grid item xs={12} md={8}>
            <SearchedTitle searchKeyword={searchKeyword} />

            <S.StyledTabs
              items={searchOptions}
              activeValue={activeSearch}
              onClick={handleFilterClick}
            />
            <S.Line />

            {videos.length > 0 && (
              <>
                <SearchedVideos videos={videos} />
                <ViewMore searchKeyword={searchKeyword} num={1} />
                <S.Line />
              </>
            )}

            {users.length > 0 && (
              <>
                <SearchedUsers users={users} />
                <ViewMore searchKeyword={searchKeyword} num={2} />
                <S.Line />
              </>
            )}

            {tags.length > 0 && (
              <>
                <SearchedTags tags={tags} />
                <ViewMore searchKeyword={searchKeyword} num={3} />
                <S.Line />
              </>
            )}
          </Grid>
        </S.ContainerGrid>
      </S.Container>
    </Layout>
  );
};

export default Searched;
