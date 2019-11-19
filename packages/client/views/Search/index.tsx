import React from 'react';
import { useRouter } from 'next/router';

import Grid from '@material-ui/core/Grid';

import * as S from './styles';
import { SearchSVG } from '../../svgs';

import Layout from '../../components/Layout';
import VideoItem from '../../components/VideoItem';
import NoSearchResults from '../../components/NoSearchResults';

const Searched: React.FunctionComponent = () => {
  const router = useRouter();

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
        username: '알렉스 권',
        avatar:
          'https://miro.medium.com/max/3150/1*n4VB9UbNNoB78-vGIhulag.jpeg',
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
        'https://i.ytimg.com/vi/F7fwB90JdXI/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDjh0ESIVV92Oy0V7IXdJqZNDaXyQ',
      playtime: '15:01',
      user: {
        username: 'shinji_every',
        avatar:
          'https://scontent-icn1-1.cdninstagram.com/vp/27c0cc1278a9631e8a780b1ece362b9e/5E699B53/t51.2885-19/s320x320/19535398_333458263754258_1048506181011636224_a.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
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
        username: '리채니',
        avatar:
          'https://scontent-icn1-1.cdninstagram.com/vp/36d31a1ed72020cf7aa877cee7ada28e/5E53CEE5/t51.2885-19/s320x320/70138700_424910224803642_8758881047598333952_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
      },
      tags: [],
      likedUsers: [],
      comments: [],
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
  ];

  const topics = ['javascript', 'python', 'aws', 'kubernetes', 'docker'];

  return (
    <Layout>
      <S.Container>
        <S.ContainerGrid container spacing={2} justify="center">
          <Grid item xs={12} md={8}>
            {/*<NoSearchResults /> : 이것은 검색 결과가 없을때*/}
            <S.Title>
              <SearchSVG width={23} height={24} />
              <span>"{router.query.query}" 검색 결과</span>
            </S.Title>
          </Grid>
          <Grid item xs={12} md={8}>
            <S.Subject> 영상 </S.Subject>
          </Grid>
          <Grid item xs={12} md={8}>
            {videos.map(video => {
              return <VideoItem {...video} />;
            })}
          </Grid>
          <Grid item xs={12} md={8}>
            <S.Subject> 사용자 </S.Subject>
          </Grid>
          <Grid item xs={12} md={8}>
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
          </Grid>
          <Grid item xs={12} md={8}>
            <S.Subject> 주제 </S.Subject>
          </Grid>
          <Grid item xs={12} md={8}>
            <S.Topics>
              {topics.map(topic => {
                return (
                  <div>
                    <S.Topic>{topic}</S.Topic>;
                  </div>
                );
              })}
            </S.Topics>
          </Grid>
        </S.ContainerGrid>
      </S.Container>
    </Layout>
  );
};

export default Searched;
