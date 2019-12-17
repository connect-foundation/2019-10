import { CircularProgress } from '@material-ui/core';

import * as S from './style';

export const VideoUploadingModal = () => {
  return (
    <S.VideoUploadingModal>
      <S.Container>
        <S.Title>동영상 업로드 중</S.Title>
        <S.LoadingSpinner>
          <CircularProgress thickness={5} />
        </S.LoadingSpinner>
        <S.Description>
          동영상 업로드 하는 중 입니다.
          <br />
          업로드가 완료될 때 까지 이 브라우저 탭을 열린 상태로 유지하세요.
        </S.Description>
      </S.Container>
    </S.VideoUploadingModal>
  );
};
