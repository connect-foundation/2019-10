import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import * as S from './styles';
import { sortOptions } from '../../constants';
import CommentForm from '../CommentForm';
import CommentItem from '../CommentItem';
import { useRouter } from 'next/router';
import { useComments } from './hooks';
import CircularLoader from '../CircularLoader';

const VideoComments = () => {
  const router = useRouter();
  const { videoId } = router.query;

  const commentsState = useComments(videoId);

  return (
    <S.VideoComments>
      <S.Title>
        {commentsState.count > 0 ? `${commentsState.count}개의 댓글` : '댓글'}
      </S.Title>
      <S.StyledTabs
        items={sortOptions}
        activeValue={commentsState.sort}
        onClick={commentsState.onSort}
      />
      <CommentForm
        loading={commentsState.formLoading}
        value={commentsState.formValue}
        active={commentsState.formActive}
        onChange={commentsState.onFormChange}
        onFocus={commentsState.onFormFocus}
        onBlur={commentsState.onFormBlur}
        onCancel={commentsState.onFormCancel}
        onSubmit={commentsState.onFormSubmit}
      />
      {commentsState.submittedComments.map(comment => (
        <CommentItem key={comment.id} {...comment} />
      ))}
      <InfiniteScroll
        style={{ overflow: 'hidden' }}
        dataLength={commentsState.comments.length}
        hasMore={commentsState.hasMore}
        loader={<CircularLoader thickness={4} />}
        next={commentsState.onNext}
        scrollThreshold={0.9}
      >
        <div>
          {commentsState.comments.map(comment => (
            <CommentItem key={comment.id} {...comment} />
          ))}
        </div>
      </InfiniteScroll>
    </S.VideoComments>
  );
};

export default VideoComments;
