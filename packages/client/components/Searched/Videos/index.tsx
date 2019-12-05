import React from 'react';
import * as S from '../styles';
import VideoItem from '../../VideoItem';

const SearchedVideos = ({ videos }) => {
  return (
    <>
      <S.Subject> 영상 </S.Subject>
      {videos.map(video => {
        return (
          <S.Videos key={video.id}>
            <VideoItem
              {...video}
              showUser={false}
              mobileType="horizontal"
              desktopType="horizontal"
            />
          </S.Videos>
        );
      })}
      ;
    </>
  );
};

export default SearchedVideos;
