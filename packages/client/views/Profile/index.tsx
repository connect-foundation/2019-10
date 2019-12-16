import React from 'react';
import { Grid } from '@material-ui/core';

import * as S from './style';
import Layout from '../../components/Layout';
import SettingSVG from '../../svgs/SettingSVG';
import { useProfile } from './hook/use-profile';

const Profile: React.FunctionComponent = () => {
  const {
    userProfile,
    handleUsername,
    handleDescription,
    handleAvatarSubmit,
    handleFormSubmit,
    isAvatarFetching,
    isFormFetching,
  } = useProfile();

  return (
    <Layout drawer={false}>
      <S.Container>
        <S.ContainerGrid container justify="center">
          <Grid item xs={12} md={6}>
            <S.Title>
              <SettingSVG />
              <span>프로필 편집</span>
            </S.Title>
            <S.Label>
              <label>
                프로필 사진
                <S.RequireMark />
              </label>
            </S.Label>
            <S.AvatarItem>
              {userProfile.avatar ? (
                <S.Avatar src={userProfile.avatar} />
              ) : (
                <S.AvatarSkeleton variant="circle" />
              )}
              <label htmlFor="avatar">
                <S.AvatarInputLabel>
                  {isAvatarFetching ? <S.AvatarCircularProgress /> : `변경하기`}
                </S.AvatarInputLabel>
              </label>
              <input
                id="avatar"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleAvatarSubmit}
              />
            </S.AvatarItem>
            <S.Form>
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
                  value={userProfile.username}
                  onChange={handleUsername}
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
                  value={userProfile.description}
                  onChange={handleDescription}
                  spellCheck={false}
                ></S.DescriptionInput>
              </S.Item>
              <S.SubmitButton>
                <button type="button" onClick={handleFormSubmit}>
                  {isFormFetching ? <S.FormCircularProgress /> : '제출하기'}
                </button>
              </S.SubmitButton>
            </S.Form>
          </Grid>
        </S.ContainerGrid>
      </S.Container>
    </Layout>
  );
};

export default Profile;
