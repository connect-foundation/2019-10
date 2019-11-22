import React, { useState } from "react";

import * as S from "./styles";

import { FavoriteSVG, ArrowDropDown } from "../../svgs";

const replies = [
  {
    id: 7,
    content: "어쩌라고? 깝치지 말자.",
    children: [],
    parent: null,
    video: {},
    user: {
      username: "알렉스 권",
      avatar: "https://miro.medium.com/max/3150/1*n4VB9UbNNoB78-vGIhulag.jpeg"
    },
    likedUsers: [{}],
    createdAt: "2019-11-15T00:51:57+00:00",
    updatedAt: "2019-11-15T00:51:57+00:00"
  },
  {
    id: 8,
    content: "응 너 고소 ^3^",
    children: [],
    parent: null,
    video: {},
    user: {
      username: "리채니",
      avatar:
        "https://scontent-icn1-1.cdninstagram.com/vp/36d31a1ed72020cf7aa877cee7ada28e/5E53CEE5/t51.2885-19/s320x320/70138700_424910224803642_8758881047598333952_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com"
    },
    likedUsers: [],
    createdAt: "2019-11-17T00:51:57+00:00",
    updatedAt: "2019-11-17T00:51:57+00:00"
  }
];

const CommentItem = ({
  reply = false,
  id,
  content,
  children,
  parent,
  user,
  likedUsers,
  createdAt,
  updatedAt
}) => {
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);

  const handleRepliesOpen = () => {
    setIsRepliesOpen(true);
  };

  return (
    <S.CommentItem reply={reply}>
      <S.User reply={reply}>
        <img src={user.avatar} />
        <span>{user.username}</span>
        <span className="dates-ago">3일 전</span>
      </S.User>

      <S.Description>{content}</S.Description>

      <S.Actions>
        <button type="button">
          <FavoriteSVG />

          {likedUsers.length !== 0 && (
            <span className="likes">{likedUsers.length}</span>
          )}
        </button>

        {!reply && (
          <>
            <span className="dot">・</span>
            <button>댓글</button>
          </>
        )}

        <span className="dot">・</span>
        <button>수정</button>
        <span className="dot">・</span>
        <button>삭제</button>
      </S.Actions>

      {children.length !== 0 && !isRepliesOpen && (
        <S.ShowRepliesButton>
          <button type="button" onClick={handleRepliesOpen}>
            <ArrowDropDown />
            <span>댓글 {children.length}개 더 보기</span>
          </button>
        </S.ShowRepliesButton>
      )}

      {isRepliesOpen && (
        <S.Replies>
          {replies.map(replyComment => {
            return (
              <CommentItem key={replyComment.id} reply {...replyComment} />
            );
          })}
        </S.Replies>
      )}
    </S.CommentItem>
  );
};

export default CommentItem;
