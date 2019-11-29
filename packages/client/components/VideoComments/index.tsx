import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import * as S from './styles';
import { sortOptions } from '../../constants';
import CommentForm from '../CommentForm';
import CommentItem from '../CommentItem';
import { useRouter } from 'next/router';
import { useComments } from './hooks';

const VideoComments = () => {
  const router = useRouter();
  const { videoId } = router.query;

  const {
    comments,
    count,
    sort,
    hasMore,
    hasData,
    onNext,
    onSort,
  } = useComments(videoId);

  const loader = (
    <S.CircularProgressContainer>
      <S.CircularProgress thickness={4} />
    </S.CircularProgressContainer>
  );

  return (
    <S.VideoComments>
      <S.Title>{hasData ? `${count}개의 댓글` : '댓글'}</S.Title>
      <S.StyledTabs items={sortOptions} activeValue={sort} onClick={onSort} />
      <CommentForm />
      {hasData ? (
        <InfiniteScroll
          dataLength={comments.length}
          next={onNext}
          hasMore={hasMore}
          loader={loader}
        >
          <div>
            {comments.map(comment => (
              <CommentItem key={comment.id} {...comment} />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        loader
      )}
    </S.VideoComments>
  );
};

export default VideoComments;
