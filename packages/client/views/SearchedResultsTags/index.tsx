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
} from '../../constants';
import { useSearchTags } from '../SearchedResults/hooks';
import { useSearchedResultsTab } from '../../components/SearchResultsTabProvider/hooks';

const SearchedResultsTags: React.FunctionComponent = () => {
  const router = useRouter();
  const searchKeyword = router.query.keyword;
  const options = useSearchedResultsTab();
  const optionArray = options.split(',');

  const [page, setPage] = useState(1);

  const { tags, tagHasMore, tagHasData } = useSearchTags(page, searchKeyword);

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

  const makeRouter = (queryKeyword, optionValue) => {
    return {
      pathname: `${endpoint.search}/${optionValue}`,
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
        <S.ContainerGrid container spacing={2} justify="center">
          <Grid item xs={12} md={8}>
            <SearchedResultsTitle searchKeyword={searchKeyword} />

            <S.StyledTabs
              items={customSearchOptions}
              activeValue={SEARCH_OPTION_VALUES.tags}
              onClick={handleFilterClick}
            />
            <S.Line />

            {tagHasData ? (
              <S.StyledInfiniteScroll
                dataLength={tags.length}
                next={handlePageChange}
                hasMore={tagHasMore}
              >
                <SearchedResultsArea
                  data={tags}
                  type={SEARCH_OPTION_VALUES.tags}
                  subject={SEARCH_OPTION_LABELS.tags}
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

export default SearchedResultsTags;