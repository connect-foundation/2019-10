import React from 'react';
import { Grid } from '@material-ui/core';

import Layout from '../../components/Layout';
import * as S from './styles';
import SettingSVG from '../../svgs/SettingSVG';

const Profile: React.FunctionComponent = () => {
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
                <S.ProfileImageItem>
                  <S.ProfileImage src="https://icon-library.net/images/small-icon-images/small-icon-images-11.jpg" />
                  <S.ChangeImageButton>변경하기</S.ChangeImageButton>
                </S.ProfileImageItem>
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
