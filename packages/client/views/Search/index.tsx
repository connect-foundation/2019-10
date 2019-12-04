import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Grid from '@material-ui/core/Grid';

import * as S from './styles';
import { SearchSVG, ArrowRightSVG } from '../../svgs';

import Layout from '../../components/Layout';
import VideoItem from '../../components/VideoItem';
import { searchOptions } from '../../constants';

const videos = [
  {
    id: 1,
    title: 'Redux-Saga - 제너레이터, 사이드이펙트, 채널',
    description: '',
    likedUsersCount: 281,
    views: 231,
    source: '',
    thumbnail:
      'https://i.ytimg.com/vi/UxpREAHZ7Ck/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDJAgGKZcymeoayYPi8rz8yhBUIrA',
    playtime: '0',
    user: {
      username: '알렉스 권',
      avatar: 'https://miro.medium.com/max/3150/1*n4VB9UbNNoB78-vGIhulag.jpeg',
    },
    createdAt: '2019-11-03 21:11:37',
  },
  {
    id: 2,
    title: 'FEconf 2019 Promotional Video',
    description: '',
    likedUsersCount: 281,
    views: 2931,
    source: '',
    thumbnail:
      'https://i.ytimg.com/vi/F7fwB90JdXI/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDjh0ESIVV92Oy0V7IXdJqZNDaXyQ',
    playtime: '0',
    user: {
      username: 'shinji_every',
      avatar:
        'https://scontent-icn1-1.cdninstagram.com/vp/27c0cc1278a9631e8a780b1ece362b9e/5E699B53/t51.2885-19/s320x320/19535398_333458263754258_1048506181011636224_a.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
    },
    createdAt: '2019-11-03 21:11:37',
  },
  {
    id: 3,
    title: 'TC39 스펙에 대한 주관적 참견 시점 - 서재원',
    description: '',
    likedUsersCount: 0,
    views: 931,
    source: '',
    thumbnail:
      'https://i.ytimg.com/vi/x4jaA3MMGSQ/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAINSBLetcIZoUAb-VmeQwM6xa9GA',
    playtime: '0',
    user: {
      username: '리채니',
      avatar:
        'https://scontent-icn1-1.cdninstagram.com/vp/36d31a1ed72020cf7aa877cee7ada28e/5E53CEE5/t51.2885-19/s320x320/70138700_424910224803642_8758881047598333952_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
    },
    createdAt: '2019-11-03 21:11:37',
  },
  {
    id: 4,
    title: 'React Component와 D3 Object를 유기적으로 연결하는 전략 - 박승현',
    description: '',
    likedUsersCount: 0,
    views: 482,
    source: '',
    thumbnail:
      'https://i.ytimg.com/vi/x4jaA3MMGSQ/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAINSBLetcIZoUAb-VmeQwM6xa9GA',
    playtime: '32:44',
    user: {
      username: 'Alex Kwon',
      avatar: 'https://miro.medium.com/max/3150/1*n4VB9UbNNoB78-vGIhulag.jpeg',
    },
    createdAt: '2019-11-03 21:11:37',
  },
  {
    id: 5,
    title: 'JAVA 객체 지향 프로그래밍 - 6. static',
    description: '',
    likedUsersCount: 0,
    views: 482,
    source: '',
    thumbnail:
      'https://i.ytimg.com/vi/hvTuZshZvIo/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAfNw4-kK6P_a3T92y5uViXTwsmNA',
    playtime: '31:44',
    user: {
      username: 'Alex Kwon',
      avatar: 'https://miro.medium.com/max/3150/1*n4VB9UbNNoB78-vGIhulag.jpeg',
    },
    createdAt: '2019-11-03 21:11:37',
  },
];

const users = [
  {
    username: '알렉스 권',
    avatar: 'https://miro.medium.com/max/3150/1*n4VB9UbNNoB78-vGIhulag.jpeg',
  },
  {
    username: '리채니',
    avatar:
      'https://scontent-icn1-1.cdninstagram.com/vp/36d31a1ed72020cf7aa877cee7ada28e/5E53CEE5/t51.2885-19/s320x320/70138700_424910224803642_8758881047598333952_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
  },
  {
    username: 'daonno1',
    avatar:
      'https://scontent-icn1-1.cdninstagram.com/vp/252dd980b9e13a462042e3e02e3090b1/5E516BC3/t51.2885-19/s320x320/66999433_729979980782225_6027446340294803456_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
  },
  {
    username: '생활코딩',
    avatar:
      'https://yt3.ggpht.com/a/AGF-l7_-fY-v2l9ftQhWqvA7cPPNqJ_C8YzAqtDEeg=s288-c-k-c0xffffffff-no-rj-mo',
  },
  {
    username: 'shinji_every',
    avatar:
      'https://scontent-icn1-1.cdninstagram.com/vp/27c0cc1278a9631e8a780b1ece362b9e/5E699B53/t51.2885-19/s320x320/19535398_333458263754258_1048506181011636224_a.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
  },
];

const topics = ['javascript', 'python', 'aws', 'kubernetes', 'docker'];

const Searched: React.FunctionComponent = () => {
  const [activeSearch, setActiveSearch] = useState(searchOptions[0].value);
  // const [page, setPage] = useState(1);
  const router = useRouter();

  const handleFilterClick = value => {
    setActiveSearch(value);
  };

  return (
    <Layout drawer={false}>
      <S.Container>
        <S.ContainerGrid container spacing={2} justify="center">
          <Grid item xs={12} md={8}>
            <S.Title>
              <SearchSVG width={23} height={24} />
              <span>"{router.query.query}" 검색 결과</span>
            </S.Title>

            <S.StyledTabs
              items={searchOptions}
              activeValue={activeSearch}
              onClick={handleFilterClick}
            />
            <S.Line />

            <S.Subject> 영상 </S.Subject>
            {videos.map(video => {
              return (
                <S.Videos>
                  <VideoItem
                    id={video.id}
                    title={video.title}
                    views={video.views}
                    thumbnail={video.thumbnail}
                    playtime={video.playtime}
                    createdAt={video.createdAt}
                    user={video.user}
                    showUser={false}
                    mobileType="horizontal"
                    desktopType="horizontal"
                  />
                </S.Videos>
              );
            })}
            <S.ViewMore>
              <button>
                <span>전체 영상</span>
                <ArrowRightSVG />
              </button>
            </S.ViewMore>
            <S.Line />

            <S.Subject> 사용자 </S.Subject>
            <S.Users>
              {users.map(user => {
                return (
                  <>
                    <S.User>
                      <S.Avatar>
                        <img src={user.avatar} />
                      </S.Avatar>
                      <S.Username>{user.username}</S.Username>
                    </S.User>
                  </>
                );
              })}
            </S.Users>
            <S.ViewMore>
              <button>
                <span>전체 사용자</span>
                <ArrowRightSVG />
              </button>
            </S.ViewMore>
            <S.Line />

            <S.Subject> 태그 </S.Subject>
            <S.Topics>
              {topics.map(topic => {
                return (
                  <div>
                    <S.Topic>{topic}</S.Topic>;
                  </div>
                );
              })}
            </S.Topics>
            <S.ViewMore>
              <button>
                <span>전체 태그</span>
                <ArrowRightSVG />
              </button>
            </S.ViewMore>
            <S.Line />
          </Grid>
        </S.ContainerGrid>
      </S.Container>
    </Layout>
  );
};

export default Searched;
