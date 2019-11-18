import React from 'react';

import * as S from './styles';

const VideoMeta = () => {
  return (
    <S.VideoMeta>
      <S.User>
        <img src="https://randomuser.me/api/portraits/men/0.jpg" />
        <span>순정마초남</span>
      </S.User>
      <S.Description>
        요즘 미국에서 한국인들을 대상으로 한 폭행 사건이 많이 일어나고 있어요.
        <br />
        슬픈 것은 위험한 지역에서는 이런 사고가 너무 많아서 그런지 미국 뉴스
        안에서는 제대로 보도가 되지 않는 경우가 많은 것 같아요.
        <br />
        앞으로 있을지도 모를 나쁜 일을 대비하기 위해 여러분이 나쁜 동네를 감지할
        수 있는 팁을 영상을 통해 알려드리고 싶어요.
        <br />
        <br />
        [올리버쌤의 실전 영어 꿀팁 100] 구매하기 예스24 https://bit.ly/31o54Dg
        교보문고 https://bit.ly/2R7WlQZ
        <br />
        <br />
        [올리버쌤의 영어 꿀팁] 책 구매하기 예스24 http://bit.ly/2QigDck 교보문고
        http://bit.ly/2qWTNJc
      </S.Description>
    </S.VideoMeta>
  );
};

export default VideoMeta;
