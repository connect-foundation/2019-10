import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Grid from '@material-ui/core/Grid';

import * as S from '../SearchedResults/style';

import Layout from '../../components/Layout';
import CircularProgress from '../../components/CircularProgress';
import SearchedResultsTitle from '../../components/SearchedResultsTitle';
import SearchedResultsArea from '../../components/SearchedResultsArea';

import {
  SEARCH_OPTION_LABELS,
  SEARCH_OPTION_VALUES,
  CENTER,
} from '../../constants';
import { useSearchVideos } from '../SearchedResults/hook/use-search';
import { useSearchedResults } from '../../components/SearchResultsProvider/hook/use-searched-results';
import { getOptionMap } from '../SearchedResults/helper/get-option-map';
import { makeRouter } from '../SearchedResults/hook/filter-router';

const SearchedResultsVideos: React.FunctionComponent = () => {
  const router = useRouter();
  const searchKeyword = router.query.keyword;
  const options = useSearchedResults();
  const optionArray = options.split(',');

  const [page, setPage] = useState(1);

  const { videos, videoHasMore, videoHasData } = useSearchVideos(
    page,
    searchKeyword,
  );

  const optionMap = getOptionMap();

  const customSearchOptions = optionArray.reduce((acc, cur) => {
    acc.push({ label: optionMap.get(cur), value: cur });
    return acc;
  }, []);

  const handlePageChange = () => {
    setPage(page + 1);
  };

  const handleFilterClick = optionValue => {
    setPage(1);
    router.push(makeRouter(searchKeyword, optionValue));
  };

  return (
    <Layout drawer={false}>
      <S.Container>
        <S.ContainerGrid container spacing={2} justify={CENTER}>
          <Grid item xs={12} md={8}>
            <SearchedResultsTitle searchKeyword={searchKeyword} />

            <S.StyledTabs
              items={customSearchOptions}
              activeValue={SEARCH_OPTION_VALUES.videos}
              onClick={handleFilterClick}
            />
            <S.Line />

            {videoHasData ? (
              <S.StyledInfiniteScroll
                dataLength={videos.length}
                next={handlePageChange}
                hasMore={videoHasMore}
              >
                <SearchedResultsArea
                  data={videos}
                  type={SEARCH_OPTION_VALUES.videos}
                  subject={SEARCH_OPTION_LABELS.videos}
                />
              </S.StyledInfiniteScroll>
            ) : (
              <CircularProgress size={28} thickness={4.5} />
            )}
          </Grid>
        </S.ContainerGrid>
      </S.Container>
    </Layout>
  );
};

export default SearchedResultsVideos;
