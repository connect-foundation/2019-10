import React from 'react';
import * as S from './styles';
import VideoItem from '../VideoItem';

const SearchedArea = ({ subject, data, type }) => {
  let children;

  if (type === 'tags') {
    children = data.map(tag => {
      return (
        <div key={tag.id}>
          <S.Tag>{tag.name}</S.Tag>;
        </div>
      );
    });
  }

  if (type === 'users') {
    children = data.map(user => {
      return (
        <S.User key={user.id}>
          <S.Avatar>
            <img src={user.avatar} />
          </S.Avatar>
          <S.Username>{user.username}</S.Username>
        </S.User>
      );
    });
  }

  if (type === 'videos') {
    children = data.map(video => {
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
    });
  }
  return (
    <>
      <S.Subject>{subject}</S.Subject>
      <div>{children}</div>
    </>
  );
};

export default SearchedArea;
