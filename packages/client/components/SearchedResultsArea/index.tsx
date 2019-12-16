import React from 'react';
import Link from 'next/link';
import * as S from './styles';
import VideoItem from '../VideoItem';
import { SEARCH_OPTION_VALUES, orientation } from '../../constants';

const SearchedResultsArea = ({ subject, data, type }) => {
  let children;

  if (type === SEARCH_OPTION_VALUES.tags) {
    children = data.map(tag => {
      return (
        <Link
          href={`/${SEARCH_OPTION_VALUES.tags}/[tagId]`}
          as={`/${SEARCH_OPTION_VALUES.tags}/${tag.id}`}
        >
          <a onClick={e => e.stopPropagation()}>
            <div key={tag.id}>
              <S.Tag>{tag.name}</S.Tag>
            </div>
          </a>
        </Link>
      );
    });
  }

  if (type === SEARCH_OPTION_VALUES.users) {
    children = data.map(user => {
      return (
        <Link
          href={`/${SEARCH_OPTION_VALUES.users}/[userId]`}
          as={`/${SEARCH_OPTION_VALUES.users}/${user.id}`}
        >
          <a onClick={e => e.stopPropagation()}>
            <S.User key={user.id}>
              <S.Avatar>
                <img src={user.avatar} />
              </S.Avatar>
              <S.Username>{user.username}</S.Username>
            </S.User>
          </a>
        </Link>
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
            mobileType={orientation.horizontal}
            desktopType={orientation.horizontal}
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
