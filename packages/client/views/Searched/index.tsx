import React from 'react';
import { useRouter } from 'next/router';

import Grid from '@material-ui/core/Grid';

import * as S from './styles';

import Layout from '../../components/Layout';
import SearchedTitle from '../../components/SearchedTitle';
import SearchedArea from '../../components/SearchedArea';
import ViewMore from '../../components/ViewMore';

import { endpoint, searchOptions, search } from '../../constants';
import { useSearchVideos, useSearchUsers, useSearchTags } from './hooks';

const Searched: React.FunctionComponent = () => {
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

  const countArray = [
    { label: '영상', value: 'videos', count: videoCount },
    { label: '사용자', value: 'users', count: userCount },
    { label: '태그', value: 'tags', count: tagCount },
  ];

  const customSearchOptions = countArray.reduce((acc, cur) => {
    if (cur.count) {
      acc.push({ label: cur.label, value: cur.value });
    }
    return acc;
  }, []);

  if (customSearchOptions.length >= 2) {
    customSearchOptions.unshift({ label: '모두', value: 'all' });
  }

  const options = customSearchOptions
    .map(option => {
      return option.value;
    })
    .join(',');

  const activeSearch =
    customSearchOptions[0] === undefined ? 'all' : customSearchOptions[0].value;

  const routerObject = (queryKeyword, num) => ({
    pathname: `${endpoint.search}/${searchOptions[num].value}`,
    query: { keyword: queryKeyword, options },
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
                    <SearchedArea data={videos} type="videos" subject="영상" />
                    {activeSearch === search.all && (
                      <ViewMore
                        searchKeyword={searchKeyword}
                        num={1}
                        options={options}
                      />
                    )}
                    <S.Line />
                  </>
                )}

                {userCount > 0 && (
                  <>
                    <SearchedArea data={users} type="users" subject="사용자" />
                    {activeSearch === search.all && (
                      <ViewMore
                        searchKeyword={searchKeyword}
                        num={2}
                        options={options}
                      />
                    )}
                    <S.Line />
                  </>
                )}

                {tagCount > 0 && (
                  <>
                    <SearchedArea data={tags} type="tags" subject="태그" />
                    {activeSearch === search.all && (
                      <ViewMore
                        searchKeyword={searchKeyword}
                        num={3}
                        options={options}
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

export default Searched;
