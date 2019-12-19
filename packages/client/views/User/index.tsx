import React from 'react';
import { Grid } from '@material-ui/core';
import { useRouter } from 'next/router';

import * as S from './styles';

import Layout from '../../components/Layout';
import UserProfile from '../../components/UserProfile';
import VideoItem from '../../components/VideoItem';
import { makeChunkList } from '../../libs/makeChunkList';
import {
  sortOptions,
  orientation,
  USER_VIDEOS_PER_PAGE,
} from '../../constants';
import { useUser, useVideos } from './hooks';
import VideoItemSkeleton from '../../components/VideoItem/skeleton';
import CircularLoader from '../../components/CircularLoader';

const User = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { user, hasData } = useUser(userId);

  const {
    videos,
    count,
    sort,
    hasMore,
    hasVideosData,
    onNext,
    onSort,
  } = useVideos(userId);
  const videoChunks = makeChunkList(videos, 3);

  const skeleton = [];
  for (let i = 0; i < USER_VIDEOS_PER_PAGE; i += 1) {
    skeleton.push(
      <Grid key={i} item xs={12} md={4}>
        <VideoItemSkeleton
          showUser={false}
          mobileType={orientation.horizontal}
        />
      </Grid>,
    );
  }

  return (
    <Layout drawer={false}>
      <S.Container>
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} md={9}>
            <UserProfile
              skeleton={!hasData}
              avatar={user.avatar}
              username={user.username}
              description={user.description}
            />
          </Grid>
        </Grid>

        <S.Videos>
          <S.ContainerGrid container spacing={0} justify="center">
            <Grid item xs={12} md={9}>
              <S.Title>{!count ? '영상' : `${count}개의 영상`}</S.Title>
              <S.StyledTabs
                items={sortOptions}
                activeValue={sort}
                onClick={onSort}
              />

              {hasVideosData ? (
                <S.StyledInfiniteScroll
                  dataLength={videos.length}
                  next={onNext}
                  hasMore={hasMore}
                  loader={<CircularLoader />}
                >
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
                                mobileType={orientation.horizontal}
                              />
                            </Grid>
                          );
                        })}
                      </S.ContainerGrid>
                    );
                  })}
                </S.StyledInfiniteScroll>
              ) : (
                <S.ContainerGrid container spacing={2} justify="flex-start">
                  {skeleton}
                </S.ContainerGrid>
              )}
            </Grid>
          </S.ContainerGrid>
        </S.Videos>
      </S.Container>
    </Layout>
  );
};

export default User;
