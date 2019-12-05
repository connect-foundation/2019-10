import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Grid from '@material-ui/core/Grid';

import * as S from './styles';
import { SearchSVG } from '../../svgs';

import Layout from '../../components/Layout';
import VideoItem from '../../components/VideoItem';
import CircularProgress from '../../components/CircularProgress';
import { endpoint, searchOptions } from '../../constants';
import { useSearchVideos } from './hooks';

const SearchedVideos: React.FunctionComponent = () => {
  const router = useRouter();
  const searchKeyword = router.query.keyword;

  const [page, setPage] = useState(1);

  const activeSearch = searchOptions[1].value;

  const { videos, videoHasMore } = useSearchVideos(page, searchKeyword);

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
      query: { keyword: queryKeyword },
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

  return (
    <Layout drawer={false}>
      <S.Container>
        <S.ContainerGrid container spacing={2} justify="center">
          <Grid item xs={12} md={8}>
            <S.Title>
              <SearchSVG width={23} height={24} />
              <span>"{searchKeyword}" 검색 결과</span>
            </S.Title>

            <S.StyledTabs
              items={searchOptions}
              activeValue={activeSearch}
              onClick={handleFilterClick}
            />
            <S.Line />

            <S.StyledInfiniteScroll
              dataLength={videos.length}
              next={handlePageChange}
              hasMore={videoHasMore}
              loader={<CircularProgress size={28} thickness={4.5} />}
            >
              <S.Subject> 영상 </S.Subject>
              {videos.map(video => {
                return (
                  <S.Videos key={video.id}>
                    <VideoItem
                      {...video}
                      showUser={false}
                      mobileType="horizontal"
                      desktopType="horizontal"
                    />
                  </S.Videos>
                );
              })}
            </S.StyledInfiniteScroll>
          </Grid>
        </S.ContainerGrid>
      </S.Container>
    </Layout>
  );
};

export default SearchedVideos;
