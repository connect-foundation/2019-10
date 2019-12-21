import React from 'react';
import { Grid } from '@material-ui/core';
import * as S from './styles';
import CircularProgress from '../../components/CircularProgress';
import Layout from '../../components/Layout';
import UserProfile from '../../components/UserProfile';
import VideoItem from '../../components/VideoItem';
import {
  SORT_OPTION,
  USER_VIDEOS_PER_PAGE,
  ORIENTATION,
} from '../../constants';
import VideoListSkeleton from '../../components/VideoListSkeleton';
import { useUserProfile } from './hook/use-user-profile';
import { useUserVideos } from './hook/use-user-videos';

const User = () => {
  const { user } = useUserProfile();
  const {
    sort,
    count,
    videos,
    hasMore,
    handleSort,
    handleNext,
  } = useUserVideos();

  return (
    <Layout drawer={false}>
      <S.Container>
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} md={9}>
            <UserProfile
              skeleton={!user}
              avatar={user && user.avatar}
              username={user && user.username}
              description={user && user.description}
            />
          </Grid>
        </Grid>

        <S.Videos>
          <S.ContainerGrid container spacing={0} justify="center">
            <Grid item xs={12} md={9}>
              <S.Title>{!count ? '영상' : `${count}개의 영상`}</S.Title>
              <S.StyledTabs
                items={SORT_OPTION}
                activeValue={sort}
                onClick={handleSort}
              />

              <S.StyledInfiniteScroll
                dataLength={videos.length}
                next={handleNext}
                hasMore={hasMore}
                loader={
                  videos.length > 0 ? (
                    <CircularProgress size={28} thickness={4.5} />
                  ) : (
                    <S.ContainerGrid container spacing={2}>
                      <VideoListSkeleton
                        count={USER_VIDEOS_PER_PAGE}
                        md={4}
                        showUser={false}
                        mobileType={ORIENTATION.HORIZONTAL}
                      />
                    </S.ContainerGrid>
                  )
                }
              >
                {videos.length > 0 && (
                  <S.ContainerGrid container spacing={2}>
                    {videos.map(video => (
                      <Grid key={video.id} item xs={12} md={4}>
                        <VideoItem
                          {...video}
                          showUser={false}
                          mobileType={ORIENTATION.HORIZONTAL}
                        />
                      </Grid>
                    ))}
                  </S.ContainerGrid>
                )}
              </S.StyledInfiniteScroll>
            </Grid>
          </S.ContainerGrid>
        </S.Videos>
      </S.Container>
    </Layout>
  );
};

export default User;
