import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Grid from '@material-ui/core/Grid';

import * as S from './styles';
import { SearchSVG, ArrowRightSVG } from '../../svgs';

import Layout from '../../components/Layout';
import {
  SearchedVideos,
  SearchedUsers,
  SearchedTags,
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

            {videos.length > 0 && (
              <>
                <SearchedVideos videos={videos} />
                <S.ViewMore>
                  <Link
                    prefetch={false}
                    href={{
                      pathname: `${endpoint.search}/${searchOptions[1].value}`,
                      query: { keyword: searchKeyword },
                    }}
                  >
                    <a>
                      <button>
                        <span>전체 영상</span>
                        <ArrowRightSVG />
                      </button>
                    </a>
                  </Link>
                </S.ViewMore>
                <S.Line />
              </>
            )}

            {users.length > 0 && (
              <>
                <SearchedUsers users={users} />
                <S.ViewMore>
                  <Link
                    prefetch={false}
                    href={{
                      pathname: `${endpoint.search}/${searchOptions[2].value}`,
                      query: { keyword: searchKeyword },
                    }}
                  >
                    <a>
                      <button>
                        <span>전체 사용자</span>
                        <ArrowRightSVG />
                      </button>
                    </a>
                  </Link>
                </S.ViewMore>
                <S.Line />
              </>
            )}

            {tags.length > 0 && (
              <>
                <SearchedTags tags={tags} />
                <S.ViewMore>
                  <Link
                    prefetch={false}
                    href={{
                      pathname: `${endpoint.search}/${searchOptions[3].value}`,
                      query: { keyword: searchKeyword },
                    }}
                  >
                    <a>
                      <button>
                        <span>전체 태그</span>
                        <ArrowRightSVG />
                      </button>
                    </a>
                  </Link>
                </S.ViewMore>
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
