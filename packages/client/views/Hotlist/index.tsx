import Grid from '@material-ui/core/Grid';
import { periodOptions } from '../../constants';
import * as S from './styles';
import HotlistSVG from '../../svgs/HotlistSVG/';
import Layout from '../../components/Layout';
import VideoItem from '../../components/VideoItem';
import { useHotlistVideos } from './hook/use-hotlist-videos';
import VideoListSkeleton from '../../components/VideoListSkeleton';

const Hotlist: React.FunctionComponent = () => {
  const {
    period,
    videos,
    hasMore,
    handlePeriod,
    handleNext,
  } = useHotlistVideos();

  return (
    <Layout>
      <S.Container>
        <S.Title>
          <HotlistSVG />
          <span>핫 리스트</span>
        </S.Title>

        <S.StyledTabs
          items={periodOptions}
          activeValue={period}
          onClick={handlePeriod}
        />

        <S.StyledInfiniteScroll
          dataLength={videos.length}
          next={handleNext}
          hasMore={hasMore}
          loader={
            <S.ContainerGrid container spacing={2}>
              <VideoListSkeleton count={20} md={3} showUser />
            </S.ContainerGrid>
          }
        >
          {videos.length > 0 && (
            <S.ContainerGrid container spacing={2}>
              {videos.map(video => (
                <Grid key={video.id} item xs={12} md={3}>
                  <VideoItem {...video} />
                </Grid>
              ))}
            </S.ContainerGrid>
          )}
        </S.StyledInfiniteScroll>
      </S.Container>
    </Layout>
  );
};

export default Hotlist;
