import React from 'react';
import Grid from '@material-ui/core/Grid';
import { NextComponentType } from 'next';

import Layout from '../../components/Layout';
import * as S from './style';
import { TagLabel } from '../../components/TagLabel';
import { CloudSVG, PhotoSVG } from '../../svgs';
import {
  VIDEO_FORM_DATA_MAX_LENGTH,
  VIDEO_UPLOAD_FORM,
  endpoint,
} from '../../constants';
import { redirect, onlyMember } from '../../libs/auth';
import { useVideoUpload } from './hook/use-video-upload';
import { ClientOnlyPortal } from '../../components/ClientOnlyPortal';
import { VideoUploadingModal } from '../../components/VideoUploadingModal';
import { VideoUploadCompleteModal } from '../../components/VideoUploadCompleteModal';

const VideoUpload: NextComponentType = () => {
  onlyMember();

  const {
    currentTag,
    tags,
    tagInput,
    textFormData,
    moveBackPage,
    uploadVideo,
    changeVideoTitle,
    changeVideoDescription,
    focusTagInput,
    changeCurrentTag,
    makeTag,
    deleteTag,
    videoFormValidationStates,
    isUploading,
    isUploadComplete,
    closeModal,
    previewVideo,
  } = useVideoUpload();

  return (
    <Layout drawer={false}>
      <ClientOnlyPortal selector={'#modal'} mounted={isUploading}>
        <VideoUploadingModal />
      </ClientOnlyPortal>

      <ClientOnlyPortal selector={'#modal'} mounted={isUploadComplete}>
        <VideoUploadCompleteModal closeModal={closeModal} />
      </ClientOnlyPortal>

      <Grid container spacing={2} justify={'center'}>
        <Grid container spacing={3} justify={'center'}>
          <Grid item xs={12} md={6}>
            <S.Title>
              <CloudSVG />
              <span>영상 업로드</span>
            </S.Title>
          </Grid>
        </Grid>

        <S.ContainerGrid container spacing={3} justify={'center'}>
          <Grid item xs={12} md={3}>
            <S.ItemHead>
              <S.ItemTitle>미리보기</S.ItemTitle>
            </S.ItemHead>
            <S.PreviewVideo controls ref={previewVideo} />
          </Grid>

          <Grid item xs={12} md={3}>
            {/* <S.ItemHead>
              <S.ItemTitle>썸네일 이미지</S.ItemTitle>
              <S.RequireMark />
            </S.ItemHead>
            <S.Thumbnail>
              {thumbnail ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={thumbnailObjectURL}
                >
                  <img src={thumbnailObjectURL} />
                </a>
              ) : (
                <>
                  <PhotoSVG />
                  <span>이미지를 업로드 해주세요</span>
                  <button onClick={showExplorer}>
                    이미지 선택하기
                    <S.File
                      accept={'image/x-png,image/jpeg'}
                      ref={thumbnailInput}
                      onChange={changeThumbnail}
                    />
                  </button>
                </>
              )}
            </S.Thumbnail> */}
          </Grid>
        </S.ContainerGrid>
        <Grid item xs={12} md={6}>
          <S.ItemHead>
            <S.ItemTitle>제목</S.ItemTitle>
            <S.RequireMark />
          </S.ItemHead>
          <S.ItemBody>
            <S.VideoTitle
              autoComplete={'off'}
              name={VIDEO_UPLOAD_FORM.TITLE}
              maxLength={VIDEO_FORM_DATA_MAX_LENGTH.TITLE}
              onChange={changeVideoTitle}
              value={textFormData.title}
            />
            {!videoFormValidationStates.title.isValid && (
              <S.ValidationMessage>
                {videoFormValidationStates.title.message}
              </S.ValidationMessage>
            )}
          </S.ItemBody>

          <S.ItemHead>
            <S.ItemTitle>설명</S.ItemTitle>
            <S.ItemSubtitle>(최대 3,000자)</S.ItemSubtitle>
          </S.ItemHead>
          <S.ItemBody>
            <S.VideoDescription
              name={VIDEO_UPLOAD_FORM.DESCRIPTION}
              rows={5}
              maxLength={VIDEO_FORM_DATA_MAX_LENGTH.DESCRIPTION}
              onChange={changeVideoDescription}
              value={textFormData.description}
            />
            {!videoFormValidationStates.description.isValid && (
              <S.ValidationMessage>
                {videoFormValidationStates.description.message}
              </S.ValidationMessage>
            )}
          </S.ItemBody>

          <S.ItemHead>
            <S.ItemTitle>태그</S.ItemTitle>
            <S.ItemSubtitle>(최대 10개)</S.ItemSubtitle>
          </S.ItemHead>
          <S.TagContainer onClick={focusTagInput}>
            {tags.map(tag => {
              return <TagLabel key={tag} name={tag} deleteTag={deleteTag} />;
            })}
            <S.TagInput
              ref={tagInput}
              onChange={changeCurrentTag}
              onKeyDown={makeTag}
              value={currentTag}
            />
          </S.TagContainer>
        </Grid>
      </Grid>
      <S.ButtonContainer>
        <S.Button onClick={moveBackPage}>뒤로가기</S.Button>
        <S.Button primary onClick={uploadVideo}>
          등록하기
        </S.Button>
        )}
      </S.ButtonContainer>
    </Layout>
  );
};

VideoUpload.getInitialProps = ({ req, res, isLoggedIn, ...rest }) => {
  if (req) {
    redirect(res, endpoint.uploadVideoFile);
  }

  return rest;
};

export default VideoUpload;
