import React from 'react';
import { useRouter } from 'next/router';

import Grid from '@material-ui/core/Grid';

import * as S from './style';

import Layout from '../../components/Layout';
import SearchedResultsTitle from '../../components/SearchedResultsTitle';
import SearchedResultsArea from '../../components/SearchedResultsArea';
import ViewMore from '../../components/ViewMore';

import {
  endpoint,
  SEARCH_OPTION_LABELS,
  SEARCH_OPTION_VALUES,
  SET_TABS,
  CENTER,
} from '../../constants';
import {
  useSearchVideos,
  useSearchUsers,
  useSearchTags,
} from './hook/use_search';
import { useSearchedResultsDispatch } from '../../components/SearchResultsProvider/hook/use_searched_results';

const SearchedResults: React.FunctionComponent = () => {
  const router = useRouter();
  const searchKeyword = router.query.keyword;

  const page = null;

  const { videos, videoCount, videoHasData } = useSearchVideos(
    page,
    searchKeyword,
  );
  const { users, userCount, userHasData } = useSearchUsers(page, searchKeyword);
  const { tags, tagCount, tagHasData } = useSearchTags(page, searchKeyword);

  const hasData = videoHasData && userHasData && tagHasData;

  const allCount = hasData ? videoCount + userCount + tagCount : null;

  const optionMap = new Map();
  optionMap.set(SEARCH_OPTION_VALUES.all, {
    label: SEARCH_OPTION_LABELS.all,
  });
  optionMap.set(SEARCH_OPTION_VALUES.videos, {
    label: SEARCH_OPTION_LABELS.videos,
    count: videoCount,
  });
  optionMap.set(SEARCH_OPTION_VALUES.users, {
    label: SEARCH_OPTION_LABELS.users,
    count: userCount,
  });
  optionMap.set(SEARCH_OPTION_VALUES.tags, {
    label: SEARCH_OPTION_LABELS.tags,
    count: tagCount,
  });

  const customSearchOptions = [];

  if (hasData) {
    optionMap.forEach((key, value) => {
      if (key.count) {
        customSearchOptions.push({ label: key.label, value });
      }
    });

    if (customSearchOptions.length >= 2) {
      customSearchOptions.unshift({
        label: SEARCH_OPTION_LABELS.all,
        value: SEARCH_OPTION_VALUES.all,
      });
    }

    const options = customSearchOptions
      .map(option => {
        return option.value;
      })
      .join(',');

    const searchedResultsDispatch = useSearchedResultsDispatch();
    searchedResultsDispatch({
      type: SET_TABS,
      tabs: options,
    });
  }

  const activeSearch = hasData
    ? customSearchOptions[0].value
    : SEARCH_OPTION_VALUES.all;

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
    router.push(makeRouter(searchKeyword, optionValue));
  };

  return (
    <Layout drawer={false}>
      <S.Container>
        <S.ContainerGrid container spacing={2} justify={CENTER}>
          <Grid item xs={12} md={8}>
            <SearchedResultsTitle searchKeyword={searchKeyword} />

            {allCount === 0 && hasData ? (
              <S.NoResults>
                <span>"{searchKeyword}"에 대한 검색결과가 없습니다...</span>
              </S.NoResults>
            ) : (
              <>
                <S.StyledTabs
                  items={customSearchOptions}
                  activeValue={activeSearch}
                  onClick={handleFilterClick}
                />
                <S.Line />

                {videoCount > 0 && (
                  <>
                    <SearchedResultsArea
                      data={videos}
                      type={SEARCH_OPTION_VALUES.videos}
                      subject={SEARCH_OPTION_LABELS.videos}
                    />
                    {activeSearch === SEARCH_OPTION_VALUES.all && (
                      <ViewMore
                        searchKeyword={searchKeyword}
                        optionValue={SEARCH_OPTION_VALUES.videos}
                      />
                    )}
                    <S.Line />
                  </>
                )}

                {userCount > 0 && (
                  <>
                    <SearchedResultsArea
                      data={users}
                      type={SEARCH_OPTION_VALUES.users}
                      subject={SEARCH_OPTION_LABELS.users}
                    />
                    {activeSearch === SEARCH_OPTION_VALUES.all && (
                      <ViewMore
                        searchKeyword={searchKeyword}
                        optionValue={SEARCH_OPTION_VALUES.users}
                      />
                    )}
                    <S.Line />
                  </>
                )}

                {tagCount > 0 && (
                  <>
                    <SearchedResultsArea
                      data={tags}
                      type={SEARCH_OPTION_VALUES.tags}
                      subject={SEARCH_OPTION_LABELS.tags}
                    />
                    {activeSearch === SEARCH_OPTION_VALUES.all && (
                      <ViewMore
                        searchKeyword={searchKeyword}
                        optionValue={SEARCH_OPTION_VALUES.tags}
                      />
                    )}
                    <S.Line />
                  </>
                )}
              </>
            )}
          </Grid>
        </S.ContainerGrid>
      </S.Container>
    </Layout>
  );
};

export default SearchedResults;
