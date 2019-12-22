import { Grid } from '@material-ui/core';
import { useRouter } from 'next/router';

import * as S from './styles';
import { useVideo } from './hooks';
import Layout from '../../components/Layout';
import VideoInfo from '../../components/VideoInfo';
import VideoMeta from '../../components/VideoMeta';
import VideoPlayer from '../../components/VideoPlayer';
import VideoComments from '../../components/VideoComments';

const Video = () => {
  const router = useRouter();
  const { videoId } = router.query;
  const { video, hasData } = useVideo(videoId);

  return (
    <Layout drawer={false}>
      <VideoPlayer src={video.source} />
      <S.Details>
        <Grid container justify="center">
          <Grid item xs={12} md={8}>
            <VideoInfo
              skeleton={!hasData}
              views={video.views}
              createdAt={video.createdAt}
              title={video.title}
              likedUsersCount={video.likedUsersCount}
              likedByUser={video.likedByUser}
            />
            <VideoMeta
              skeleton={!hasData}
              username={video.user.username}
              userId={video.user.id}
              avatar={video.user.avatar}
              description={video.description}
            />
            <VideoComments />
          </Grid>
        </Grid>
      </S.Details>
    </Layout>
  );
};

export default Video;
