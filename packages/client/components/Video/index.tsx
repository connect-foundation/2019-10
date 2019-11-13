import React from 'react';

import * as S from './styles';

const Video: React.FunctionComponent = () => {
  return (
    <S.Video>
      <S.Thumbnail>
        <img
          src={`https://lanaicat-wpengine.netdna-ssl.com/wp-content/uploads/2019/06/cat-slider4.png`}
        />
      </S.Thumbnail>
      <S.Details>
        <S.Avatar>
          <img src={`http://pds18.egloos.com/logo/201103/06/20/c0121120.jpg`} />
        </S.Avatar>
        <S.Info>
          <S.Title>강관훈쵝오</S.Title>
          <S.Username>name</S.Username>
          <S.Additionals>
            <span>조회 수 {3000}</span>
            <span> · </span>
            <span>{3}일전</span>
          </S.Additionals>
        </S.Info>
      </S.Details>
    </S.Video>
  );
};

export default Video;
