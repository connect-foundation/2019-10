import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

import { hotlistFilters } from '../../constants';

import * as S from './styles';
import HotlistSVG from '../../svgs/HotlistSVG/';
import Layout from '../../components/Layout';
import VideoItem from '../../components/VideoItem';

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
      username: 'daonno1',
      avatar:
        'https://scontent-icn1-1.cdninstagram.com/vp/252dd980b9e13a462042e3e02e3090b1/5E516BC3/t51.2885-19/s320x320/66999433_729979980782225_6027446340294803456_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
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
      username: '생활코딩',
      avatar:
        'https://yt3.ggpht.com/a/AGF-l7_-fY-v2l9ftQhWqvA7cPPNqJ_C8YzAqtDEeg=s288-c-k-c0xffffffff-no-rj-mo',
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
      username: '알렉스 권',
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
      username: 'shinji_every',
      avatar:
        'https://scontent-icn1-1.cdninstagram.com/vp/27c0cc1278a9631e8a780b1ece362b9e/5E699B53/t51.2885-19/s320x320/19535398_333458263754258_1048506181011636224_a.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
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
      username: '리채니',
      avatar:
        'https://scontent-icn1-1.cdninstagram.com/vp/36d31a1ed72020cf7aa877cee7ada28e/5E53CEE5/t51.2885-19/s320x320/70138700_424910224803642_8758881047598333952_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
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
      username: 'daonno1',
      avatar:
        'https://scontent-icn1-1.cdninstagram.com/vp/252dd980b9e13a462042e3e02e3090b1/5E516BC3/t51.2885-19/s320x320/66999433_729979980782225_6027446340294803456_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
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
      username: '생활코딩',
      avatar:
        'https://yt3.ggpht.com/a/AGF-l7_-fY-v2l9ftQhWqvA7cPPNqJ_C8YzAqtDEeg=s288-c-k-c0xffffffff-no-rj-mo',
    },
    tags: [],
    likedUsers: [],
    comments: [],
  },
];

const Hotlist: React.FunctionComponent = () => {
  const [activeFilterValue, setActiveFilterValue] = useState(
    hotlistFilters[0].value,
  );

  const handleFilterClick = value => {
    setActiveFilterValue(value);
  };

  return (
    <Layout>
      <S.Container>
        <S.Title>
          <HotlistSVG />
          <span>핫 리스트</span>
        </S.Title>

        <S.StyledFilters
          filters={hotlistFilters}
          activeValue={activeFilterValue}
          onClick={handleFilterClick}
        />

        <S.ContainerGrid container spacing={2}>
          {videos.map(video => {
            return (
              <Grid key={video.id} item xs={12} md={3}>
                <VideoItem {...video} />
              </Grid>
            );
          })}
        </S.ContainerGrid>
      </S.Container>
    </Layout>
  );
};

export default Hotlist;
