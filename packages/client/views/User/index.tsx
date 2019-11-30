import React from 'react';
import { Grid } from '@material-ui/core';

import * as S from './styles';

import Layout from '../../components/Layout';
import UserProfile from '../../components/UserProfile';
import VideoItem from '../../components/VideoItem';
import Filters from '../../components/Filters';
import { chunkList } from '../../libs/chunkList';

const videos = [
  {
    id: 1,
    title: 'Redux-Saga - 제너레이터, 사이드이펙트, 채널',
    description: '',
    like: 281,
    hit: 231,
    sourceUrl: '',
    thumbnail:
      'https://i.ytimg.com/vi/UxpREAHZ7Ck/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDJAgGKZcymeoayYPi8rz8yhBUIrA',
    playtime: '10:44',
    user: {
      username: 'Alex Kwon',

      avatar: 'https://miro.medium.com/max/3150/1*n4VB9UbNNoB78-vGIhulag.jpeg',
    },
    tags: [],
    likedUsers: [],
    comments: [],
  },
  {
    id: 2,
    title: 'FEconf 2019 Promotional Video',
    description: '',
    like: 281,
    hit: 2931,
    sourceUrl: '',
    thumbnail:
      'https://i.ytimg.com/vi/UxpREAHZ7Ck/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDJAgGKZcymeoayYPi8rz8yhBUIrA',
    playtime: '15:01',
    user: {
      username: 'Alex Kwon',
      avatar: 'https://miro.medium.com/max/3150/1*n4VB9UbNNoB78-vGIhulag.jpeg',
    },
    tags: [],
    likedUsers: [],
    comments: [],
  },
  {
    id: 3,
    title: 'TC39 스펙에 대한 주관적 참견 시점 - 서재원',
    description: '',
    like: 0,
    hit: 931,
    sourceUrl: '',
    thumbnail:
      'https://i.ytimg.com/vi/x4jaA3MMGSQ/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAINSBLetcIZoUAb-VmeQwM6xa9GA',
    playtime: '32:44',
    user: {
      username: 'Alex Kwon',

      avatar: 'https://miro.medium.com/max/3150/1*n4VB9UbNNoB78-vGIhulag.jpeg',
    },
    tags: [],
    likedUsers: [],
    comments: [],
  },
  {
    id: 4,
    title: 'React Component와 D3 Object를 유기적으로 연결하는 전략 - 박승현',
    description: '',
    like: 0,
    hit: 482,
    sourceUrl: '',
    thumbnail:
      'https://i.ytimg.com/vi/x4jaA3MMGSQ/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAINSBLetcIZoUAb-VmeQwM6xa9GA',
    playtime: '32:44',
    user: {
      username: 'Alex Kwon',
      avatar: 'https://miro.medium.com/max/3150/1*n4VB9UbNNoB78-vGIhulag.jpeg',
    },
    tags: [],
    likedUsers: [],
    comments: [],
  },
  {
    id: 5,
    title: 'JAVA 객체 지향 프로그래밍 - 6. static',
    description: '',
    like: 0,
    hit: 482,
    sourceUrl: '',
    thumbnail:
      'https://i.ytimg.com/vi/hvTuZshZvIo/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAfNw4-kK6P_a3T92y5uViXTwsmNA',
    playtime: '31:44',
    user: {
      username: 'Alex Kwon',
      avatar: 'https://miro.medium.com/max/3150/1*n4VB9UbNNoB78-vGIhulag.jpeg',
    },
    tags: [],
    likedUsers: [],
    comments: [],
  },
  {
    id: 6,
    title: 'Redux-Saga - 제너레이터, 사이드이펙트, 채널',
    description: '',
    like: 281,
    hit: 231,
    sourceUrl: '',
    thumbnail:
      'https://i.ytimg.com/vi/UxpREAHZ7Ck/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDJAgGKZcymeoayYPi8rz8yhBUIrA',
    playtime: '10:44',
    user: {
      username: 'Alex Kwon',
      avatar: 'https://miro.medium.com/max/3150/1*n4VB9UbNNoB78-vGIhulag.jpeg',
    },
    tags: [],
    likedUsers: [],
    comments: [],
  },
  {
    id: 7,
    title: 'FEconf 2019 Promotional Video',
    description: '',
    like: 281,
    hit: 2931,
    sourceUrl: '',
    thumbnail:
      'https://i.ytimg.com/vi/F7fwB90JdXI/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDjh0ESIVV92Oy0V7IXdJqZNDaXyQ',
    playtime: '15:01',
    user: {
      username: 'Alex Kwon',
      avatar: 'https://miro.medium.com/max/3150/1*n4VB9UbNNoB78-vGIhulag.jpeg',
    },
    tags: [],
    likedUsers: [],
    comments: [],
  },
  {
    id: 8,
    title: 'TC39 스펙에 대한 주관적 참견 시점 - 서재원',
    description: '',
    like: 0,
    hit: 931,
    sourceUrl: '',
    thumbnail:
      'https://i.ytimg.com/vi/x4jaA3MMGSQ/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAINSBLetcIZoUAb-VmeQwM6xa9GA',
    playtime: '32:44',
    user: {
      username: 'Alex Kwon',
      avatar: 'https://miro.medium.com/max/3150/1*n4VB9UbNNoB78-vGIhulag.jpeg',
    },
    tags: [],
    likedUsers: [],
    comments: [],
  },
  {
    id: 9,
    title: 'React Component와 D3 Object를 유기적으로 연결하는 전략 - 박승현',
    description: '',
    like: 0,
    hit: 482,
    sourceUrl: '',
    thumbnail:
      'https://i.ytimg.com/vi/x4jaA3MMGSQ/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAINSBLetcIZoUAb-VmeQwM6xa9GA',
    playtime: '32:44',
    user: {
      username: 'Alex Kwon',
      avatar: 'https://miro.medium.com/max/3150/1*n4VB9UbNNoB78-vGIhulag.jpeg',
    },
    tags: [],
    likedUsers: [],
    comments: [],
  },
  {
    id: 10,
    title: 'JAVA 객체 지향 프로그래밍 - 6. static',
    description: '',
    like: 0,
    hit: 482,
    sourceUrl: '',
    thumbnail:
      'https://i.ytimg.com/vi/hvTuZshZvIo/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAfNw4-kK6P_a3T92y5uViXTwsmNA',
    playtime: '31:44',
    user: {
      username: 'Alex Kwon',
      avatar: 'https://miro.medium.com/max/3150/1*n4VB9UbNNoB78-vGIhulag.jpeg',
    },
    tags: [],
    likedUsers: [],
    comments: [],
  },
];

const User = () => {
  const videoChunks = chunkList(videos, 3);

  return (
    <Layout drawer={false}>
      <S.Container>
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} md={9}>
            <UserProfile />
          </Grid>
        </Grid>

        <S.Videos>
          <S.ContainerGrid container spacing={0} justify="center">
            <Grid item xs={12} md={9}>
              <S.ContainerGrid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <S.Title>6개의 영상</S.Title>

                  <S.StyledFilters
                    filters={['인기 순', '최신 순']}
                    activeFilter="인기 순"
                    onClick={filter => null}
                  />
                </Grid>
              </S.ContainerGrid>
            </Grid>
          </S.ContainerGrid>

          <S.ContainerGrid container spacing={0} justify="center">
            <Grid item xs={12} md={9}>
              {videoChunks.map((chunk, i) => {
                return (
                  <S.ContainerGrid
                    key={i}
                    container
                    spacing={2}
                    justify="flex-start"
                  >
                    {chunk.map(video => {
                      return (
                        <Grid key={video.id} item xs={12} md={4}>
                          <VideoItem
                            {...video}
                            showUser={false}
                            mobileType="horizontal"
                          />
                        </Grid>
                      );
                    })}
                  </S.ContainerGrid>
                );
              })}
            </Grid>
          </S.ContainerGrid>
        </S.Videos>
      </S.Container>
    </Layout>
  );
};

export default User;
