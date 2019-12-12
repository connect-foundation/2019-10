import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Grid from '@material-ui/core/Grid';

import * as S from '../Searched/styles';

import Layout from '../../components/Layout';
import CircularProgress from '../../components/CircularProgress';
import SearchedTitle from '../../components/SearchedTitle';
import SearchedArea from '../../components/SearchedArea';

import { endpoint, searchOptions } from '../../constants';
import { useSearchVideos } from '../Searched/hooks';

const SearchedVideosView: React.FunctionComponent = () => {
  const router = useRouter();
  const searchKeyword = router.query.keyword;
  const options = router.query.options as string;
  const optionArray = options.split(',');
  const [page, setPage] = useState(1);

  const activeSearch = searchOptions[1].value;

  const { videos, videoHasMore, videoHasData } = useSearchVideos(
    page,
    searchKeyword,
  );

  const optionMap = new Map();
  optionMap.set('all', '모두');
  optionMap.set('videos', '영상');
  optionMap.set('users', '사용자');
  optionMap.set('tags', '태그');

  const customSearchOptions = optionArray.reduce((acc, cur) => {
    acc.push({ label: optionMap.get(cur), value: cur });
    return acc;
  }, []);

  const handlePageChange = () => {
    setPage(page + 1);
  };

  const routerObject = (queryKeyword, num) => {
    if (num === 0) {
      return {
        pathname: `${endpoint.search}`,
        query: { keyword: queryKeyword },
      };
    }
    return {
      pathname: `${endpoint.search}/${searchOptions[num].value}`,
      query: { keyword: queryKeyword, options },
    };
  };

  const handleFilterClick = value => {
    setPage(1);
    if (value === searchOptions[0].value) {
      router.push(routerObject(searchKeyword, 0));
    }
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

  const loader = <CircularProgress size={28} thickness={4.5} />;

  return (
    <Layout drawer={false}>
      <S.Container>
        <S.ContainerGrid container spacing={2} justify="center">
          <Grid item xs={12} md={8}>
            <SearchedTitle searchKeyword={searchKeyword} />

            <S.StyledTabs
              items={customSearchOptions}
              activeValue={activeSearch}
              onClick={handleFilterClick}
            />
            <S.Line />

            {videoHasData ? (
              <S.StyledInfiniteScroll
                dataLength={videos.length}
                next={handlePageChange}
                hasMore={videoHasMore}
              >
                <SearchedArea data={videos} type="videos" subject="영상" />
              </S.StyledInfiniteScroll>
            ) : (
              loader
            )}
          </Grid>
        </S.ContainerGrid>
      </S.Container>
    </Layout>
  );
};

export default SearchedVideosView;
