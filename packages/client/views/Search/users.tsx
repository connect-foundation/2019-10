import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Grid from '@material-ui/core/Grid';

import * as S from './styles';
import { SearchSVG } from '../../svgs';

import Layout from '../../components/Layout';
import CircularProgress from '../../components/CircularProgress';
import { endpoint, searchOptions } from '../../constants';
import { useSearchUsers } from './hooks';

const SearchedUsers: React.FunctionComponent = () => {
  const router = useRouter();
  const searchKeyword = router.query.keyword;

  const [page, setPage] = useState(1);

  const activeSearch = searchOptions[2].value;

  const { users, userHasMore } = useSearchUsers(page, searchKeyword);

  const handlePageChange = () => {
    setPage(page + 1);
  };

  const handleFilterClick = value => {
    setPage(1);
    if (value === searchOptions[0].value) {
      router.push({
        pathname: endpoint.search,
        query: { keyword: searchKeyword },
      });
    }
    if (value === searchOptions[1].value) {
      router.push({
        pathname: `${endpoint.search}/${searchOptions[1].value}`,
        query: { keyword: searchKeyword },
      });
    }
    if (value === searchOptions[2].value) {
      router.push({
        pathname: `${endpoint.search}/${searchOptions[2].value}`,
        query: { keyword: searchKeyword },
      });
    }
    if (value === searchOptions[3].value) {
      router.push({
        pathname: `${endpoint.search}/${searchOptions[3].value}`,
        query: { keyword: searchKeyword },
      });
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
              dataLength={users.length}
              next={handlePageChange}
              hasMore={userHasMore}
              loader={<CircularProgress size={28} thickness={4.5} />}
            >
              <S.Users>
                {users.map(user => {
                  return (
                    <S.User key={user.id}>
                      <S.Avatar>
                        <img src={user.avatar} />
                      </S.Avatar>
                      <S.Username>{user.username}</S.Username>
                    </S.User>
                  );
                })}
              </S.Users>
            </S.StyledInfiniteScroll>
          </Grid>
        </S.ContainerGrid>
      </S.Container>
    </Layout>
  );
};

export default SearchedUsers;
