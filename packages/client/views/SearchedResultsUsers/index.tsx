import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Grid from '@material-ui/core/Grid';

import * as S from '../SearchedResults/styles';

import Layout from '../../components/Layout';
import CircularProgress from '../../components/CircularProgress';
import SearchedResultsTitle from '../../components/SearchedResultsTitle';
import SearchedResultsArea from '../../components/SearchedResultsArea';

import {
  endpoint,
  SEARCH_OPTION_LABELS,
  SEARCH_OPTION_VALUES,
  CENTER,
} from '../../constants';
import { useSearchUsers } from '../SearchedResults/hooks';
import { useSearchedResults } from '../../components/SearchResultsProvider/hooks';

const SearchedResultsUsers: React.FunctionComponent = () => {
  const router = useRouter();
  const searchKeyword = router.query.keyword;
  const options = useSearchedResults();
  const optionArray = options.split(',');

  const [page, setPage] = useState(1);

  const { users, userHasMore, userHasData } = useSearchUsers(
    page,
    searchKeyword,
  );

  const optionMap = new Map();
  optionMap.set(SEARCH_OPTION_VALUES.all, SEARCH_OPTION_LABELS.all);
  optionMap.set(SEARCH_OPTION_VALUES.videos, SEARCH_OPTION_LABELS.videos);
  optionMap.set(SEARCH_OPTION_VALUES.users, SEARCH_OPTION_LABELS.users);
  optionMap.set(SEARCH_OPTION_VALUES.tags, SEARCH_OPTION_LABELS.tags);

  const customSearchOptions = optionArray.reduce((acc, cur) => {
    acc.push({ label: optionMap.get(cur), value: cur });
    return acc;
  }, []);

  const handlePageChange = () => {
    setPage(page + 1);
  };

  const makeRouter = (queryKeyword, optionValue) => {
    const pathname =
      optionValue === SEARCH_OPTION_VALUES.all
        ? `${endpoint.search}`
        : `${endpoint.search}/${optionValue}`;

    return {
      pathname,
      query: { keyword: queryKeyword },
    };
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
              activeValue={SEARCH_OPTION_VALUES.users}
              onClick={handleFilterClick}
            />
            <S.Line />

            {userHasData ? (
              <S.StyledInfiniteScroll
                dataLength={users.length}
                next={handlePageChange}
                hasMore={userHasMore}
              >
                <SearchedResultsArea
                  data={users}
                  type={SEARCH_OPTION_VALUES.users}
                  subject={SEARCH_OPTION_LABELS.users}
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

export default SearchedResultsUsers;
