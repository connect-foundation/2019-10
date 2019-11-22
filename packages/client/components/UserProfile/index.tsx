import React from 'react';

import * as S from './styles';
import { Grid } from '@material-ui/core';

const UserProfile = () => {
  return (
    <S.UserProfile>
      <S.Content>
        <S.Avatar>
          <img src="https://miro.medium.com/max/3150/1*n4VB9UbNNoB78-vGIhulag.jpeg" />
        </S.Avatar>
        <S.Info>
          <h1>Alex Kwon</h1>
          <div>
            안녕하세요?
            <br />
            개발하면서 이것저것 하는 한량이에요.
            <br />
            <br />
            GCP를 좋아하고, pixel perfect 한 프론트엔드 앱을 좋아해요.
            <br />
            소프트웨어는 사용자에 초점을 맞춰야해요. 그 외는 전부 부수적인 것
            뿐이죠.
          </div>
        </S.Info>
      </S.Content>
    </S.UserProfile>
  );
};

export default UserProfile;
