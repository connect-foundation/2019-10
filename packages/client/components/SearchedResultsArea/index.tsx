import React from 'react';
import Link from 'next/link';
import * as S from './style';
import VideoItem from '../VideoItem';
import { SEARCH_OPTION_VALUES, ORIENTATION } from '../../constants';

const SearchedResultsArea = ({ subject, data, type }) => {
  let children;

  if (type === SEARCH_OPTION_VALUES.tags) {
    children = data.map(tag => {
      return (
        <div key={tag.id}>
          <Link
            href={`/${SEARCH_OPTION_VALUES.tags}/[tagId]`}
            as={`/${SEARCH_OPTION_VALUES.tags}/${tag.id}`}
          >
            <a>
              <S.Tag>{tag.name}</S.Tag>
            </a>
          </Link>
        </div>
      );
    });
  }

  if (type === SEARCH_OPTION_VALUES.users) {
    children = data.map(user => {
      return (
        <S.User key={user.id}>
          <Link
            href={`/${SEARCH_OPTION_VALUES.users}/[userId]`}
            as={`/${SEARCH_OPTION_VALUES.users}/${user.id}`}
          >
            <a>
              <S.Avatar>
                <img src={user.avatar} />
              </S.Avatar>
              <S.Username>{user.username}</S.Username>
            </a>
          </Link>
        </S.User>
      );
    });
  }

  if (type === SEARCH_OPTION_VALUES.videos) {
    children = data.map(video => {
      return (
        <S.Videos key={video.id}>
          <VideoItem
            {...video}
            showUser={false}
            mobileType={ORIENTATION.HORIZONTAL}
            desktopType={ORIENTATION.HORIZONTAL}
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

export default SearchedResultsArea;
