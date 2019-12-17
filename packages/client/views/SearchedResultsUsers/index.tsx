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
import { useSearchUsers } from '../SearchedResults/hook/use-search';
import { useSearchedResults } from '../../components/SearchResultsProvider/hook/use-searched-results';
import { makeOptionMap } from '../SearchedResults/helper/make-option-map';
import { makeRouter } from '../SearchedResults/helper/filter-router';

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

  const optionMap = makeOptionMap();

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
