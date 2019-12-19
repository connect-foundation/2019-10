import * as S from './style';
import { CheckSVG } from '../../svgs';

export const VideoUploadCompleteModal = ({ closeModal }) => {
  return (
    <S.VideoUploadCompleteModal>
      <S.Container>
        <S.Title>업로드 완료!</S.Title>
        <S.CompleteSign>
          <CheckSVG />
        </S.CompleteSign>
        <S.Description>
          업로드가 완료되었습니다!
          <br />
          동영상이 처리될 때 까지 시간이 소요됩니다.
          <br />
          잠시 후, 내 프로필에서 확인해 주세요.
        </S.Description>
        <S.Button onClick={closeModal}>확인</S.Button>
      </S.Container>
    </S.VideoUploadCompleteModal>
  );
};
