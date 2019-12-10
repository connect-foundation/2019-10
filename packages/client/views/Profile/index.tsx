import React, { useState, useReducer } from 'react';
import { Grid } from '@material-ui/core';

import Layout from '../../components/Layout';
import * as S from './styles';
import SettingSVG from '../../svgs/SettingSVG';
import { useUser } from '../../components/UserProvider/hooks';
import { initialProfileState, profileReducer } from './hooks';
import { DEFAULT_USER_IMAGE } from '../../constants';

const Profile: React.FunctionComponent = () => {
  const user = useUser();
  const userAvatar = user ? user.avatar : DEFAULT_USER_IMAGE;
  const [avatarURL, setAvatarURL] = useState(userAvatar);

  const [profile, dispatchProfile] = useReducer(
    profileReducer,
    initialProfileState,
  );

  const handleUserName = e =>
    dispatchProfile({ type: 'updateUserName', value: e.target.value });

  const handleDescription = e =>
    dispatchProfile({ type: 'updateDescription', value: e.target.value });

  const handleAvatar = e => {
    if (e.target.files[0]) {
      setAvatarURL(URL.createObjectURL(e.target.files[0]));
      dispatchProfile({
        type: 'updateAvatar',
        value: e.target.files[0],
      });
    }
  };

  return (
    <Layout drawer={false}>
      <S.Container>
        <S.ContainerGrid container justify="center">
          <Grid item xs={12} md={6}>
            <S.Title>
              <SettingSVG />
              <span>프로필 편집</span>
            </S.Title>
            <S.Form>
              <S.Item>
                <S.Label>
                  <label>
                    프로필 사진
                    <S.RequireMark />
                  </label>
                </S.Label>
                <S.AvatarItem>
                  <S.Avatar src={avatarURL} />
                  <label htmlFor="avatar">
                    <S.AvatarInputLabel>변경하기</S.AvatarInputLabel>
                  </label>
                  <input id="avatar" type="file" onChange={handleAvatar} />
                </S.AvatarItem>
              </S.Item>
              <S.Item>
                <S.Label>
                  <label>
                    닉네임
                    <S.RequireMark />
                  </label>
                  <span>(영문, 숫자 또는 한글)</span>
                </S.Label>
                <S.UserNameInput
                  id="username"
                  name="username"
                  type="text"
                  onChange={handleUserName}
                  spellCheck={false}
                ></S.UserNameInput>
              </S.Item>
              <S.Item>
                <S.Label>
                  <label htmlFor="description">소개</label>
                  <span>(최대 1,500자)</span>
                </S.Label>
                <S.DescriptionInput
                  id="description"
                  name="description"
                  onChange={handleDescription}
                  spellCheck={false}
                ></S.DescriptionInput>
              </S.Item>
              <S.SubmitButton>
                <button>제출하기</button>
              </S.SubmitButton>
            </S.Form>
          </Grid>
        </S.ContainerGrid>
      </S.Container>
    </Layout>
  );
};

export default Profile;
