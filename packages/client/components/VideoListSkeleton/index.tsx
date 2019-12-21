import React from 'react';
import { Grid } from '@material-ui/core';
import VideoItemSkeleton from '../VideoItem/skeleton';
import { ORIENTATION } from '../../constants';

const VideoListSkeleton = ({
  count,
  md,
  showUser = true,
  mobileType = ORIENTATION.VERTICAL,
  desktopType = ORIENTATION.VERTICAL,
}) => {
  const items = [];
  for (let i = 0; i < count; i += 1) {
    items.push(
      <Grid key={i} item xs={12} md={md}>
        <VideoItemSkeleton
          showUser={showUser}
          mobileType={mobileType}
          desktopType={desktopType}
        />
      </Grid>,
    );
  }
  return <>{items}</>;
};

export default VideoListSkeleton;
