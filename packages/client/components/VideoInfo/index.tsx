import React from 'react';
import moment from 'moment';
import Link from 'next/link';

import * as S from './styles';
import { ExtractedTag } from './interface/tag';
import VideoInfoSkeleton from './skeleton';
import { FavoriteSVG } from '../../svgs';
import { useVideoLike } from './hook/use-video-like';
import { useVideoTags } from './hook/use-video-tags';
import { endpoint } from '../../constants';

const VideoInfo = ({
  skeleton,
  views,
  createdAt,
  title,
  likedUsersCount,
  likedByUser,
}) => {
  const { likesCount, liked, onLike } = useVideoLike(
    likedUsersCount,
    likedByUser,
  );
  const { videoTags } = useVideoTags();

  return skeleton ? (
    <VideoInfoSkeleton />
  ) : (
    <S.VideoInfo>
      <S.ViewsAndDates>
        <span>조회 수 {views}</span>
        <span className="dot">・</span>
        <span>{moment(createdAt).format('YYYY년 MM월 DD일')}</span>
      </S.ViewsAndDates>

      <S.Title>{title}</S.Title>

      <S.Tags>
        {videoTags.map((tag: ExtractedTag) => (
          <Link
            key={tag.id}
            href={`${endpoint.tags}/[tagId]`}
            as={`${endpoint.tags}/${tag.id}`}
          >
            <S.Tag>{tag.name}</S.Tag>
          </Link>
        ))}
      </S.Tags>

      <S.Like type="button" active={liked} onClick={onLike}>
        <div>
          <FavoriteSVG />
        </div>
        <span>
          좋아요
          {likesCount && likesCount > 0 ? ` ${likesCount}개` : ''}
        </span>
      </S.Like>
    </S.VideoInfo>
  );
};

export default VideoInfo;
