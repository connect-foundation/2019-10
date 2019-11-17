import React from 'react';
import { Grid } from '@material-ui/core';

import * as S from './styles';

import Layout from '../../components/Layout';
import VideoInfo from '../../components/VideoInfo';
import VideoMeta from '../../components/VideoMeta';
import Filters from '../../components/Filters';
import CommentForm from '../../components/CommentForm';
import CommentList from '../../components/CommentList';

const comments = [
  {
    id: 1,
    content:
      '데싱디바붙인거 귀여우 죽넴😭 펭수얼굴 들어간 스페셜에디션 만들어주세요🐧',
    children: [],
    parent: null,
    video: {},
    user: {
      username: '알렉스 권',
      avatar: 'https://miro.medium.com/max/3150/1*n4VB9UbNNoB78-vGIhulag.jpeg',
    },
    likedUsers: [{}],
    createdAt: '2019-11-15T00:51:57+00:00',
    updatedAt: '2019-11-15T00:51:57+00:00',
  },
  {
    id: 2,
    content: '우래기 슈스돼떠요🤭',
    children: [],
    parent: null,
    video: {},
    user: {
      username: 'shinji_every',
      avatar:
        'https://scontent-icn1-1.cdninstagram.com/vp/27c0cc1278a9631e8a780b1ece362b9e/5E699B53/t51.2885-19/s320x320/19535398_333458263754258_1048506181011636224_a.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
    },
    likedUsers: [{}, {}, {}, {}],
    createdAt: '2019-11-17T00:51:57+00:00',
    updatedAt: '2019-11-17T00:51:57+00:00',
  },
  {
    id: 3,
    content: '저걸 실제로 사서 타는 사람이 내 옆에 있었어 🤔 역시 내팅구 💖',
    children: [{}, {}],
    parent: null,
    video: {},
    user: {
      username: '리채니',
      avatar:
        'https://scontent-icn1-1.cdninstagram.com/vp/36d31a1ed72020cf7aa877cee7ada28e/5E53CEE5/t51.2885-19/s320x320/70138700_424910224803642_8758881047598333952_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
    },
    likedUsers: [],
    createdAt: '2019-11-17T00:51:57+00:00',
    updatedAt: '2019-11-17T00:51:57+00:00',
  },
  {
    id: 6,
    content: '활쏘시는 열정이 정말 대단하십니다👏👏👏😁',
    children: [],
    parent: null,
    video: {},
    user: {
      username: 'daonno1',
      avatar:
        'https://scontent-icn1-1.cdninstagram.com/vp/252dd980b9e13a462042e3e02e3090b1/5E516BC3/t51.2885-19/s320x320/66999433_729979980782225_6027446340294803456_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
    },
    likedUsers: [{}, {}],
    createdAt: '2019-11-17T00:51:57+00:00',
    updatedAt: '2019-11-17T00:51:57+00:00',
  },
];

const Video = () => {
  return (
    <Layout drawer={false}>
      <S.Video>
        <video controls>
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
          <source
            src="https://www.w3schools.com/html/mov_bbb.ogg"
            type="video/ogg"
          />
        </video>
      </S.Video>
      <S.Details>
        <Grid container justify="center">
          <Grid item xs={12} md={8}>
            <VideoInfo />
            <VideoMeta />
            <S.Comments>
              <S.Title>213개의 댓글</S.Title>
              <S.StyledFilters
                filters={['인기 순', '최신 순']}
                activeFilter="인기 순"
                onClick={filter => null}
              />
              <CommentForm />
              <CommentList comments={comments} />
            </S.Comments>
          </Grid>
        </Grid>
      </S.Details>
    </Layout>
  );
};

export default Video;
