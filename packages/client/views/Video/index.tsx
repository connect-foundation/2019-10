import React from 'react';
import { Grid } from '@material-ui/core';

import * as S from './styles';

import { sortOptions } from '../../constants';

import Layout from '../../components/Layout';
import VideoInfo from '../../components/VideoInfo';
import VideoMeta from '../../components/VideoMeta';
import CommentForm from '../../components/CommentForm';
import CommentList from '../../components/CommentList';

import { useVideo } from './hooks';
import { useRouter } from 'next/router';

const Video = () => {
  const router = useRouter();
  const { videoId } = router.query;

  const { video, hasData } = useVideo(videoId);

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
            <S.Comments>
              <S.Title>213개의 댓글</S.Title>
              <S.StyledTabs
                items={sortOptions}
                activeValue={sortOptions[0].value}
                onClick={value => null}
              />
              <CommentForm />
              <CommentList comments={comments} />
            </S.Comments>
            <VideoInfo
              skeleton={!hasData}
              views={video.views}
              createdAt={video.createdAt}
              title={video.title}
              likedUsersCount={video.likedUsersCount}
            />
            <VideoMeta
              skeleton={!hasData}
              username={video.user.username}
              avatar={video.user.avatar}
              description={video.description}
            />
          </Grid>
        </Grid>
      </S.Details>
    </Layout>
  );
};

export default Video;
