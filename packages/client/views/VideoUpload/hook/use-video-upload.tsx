import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';
import { useMutation } from 'react-fetching-library';

import { useVideoFile } from '../../../components/VideoFileProvider/hooks';
import { VideoFormData } from '../model/video-form-data';
import { useUser } from '../../../components/UserProvider/hooks';
import { UploadVideoDetailDtoFactory } from '../dto/upload-video-dto-factory';
import { SPACEBAR, endpoint } from '../../../constants';
import {
  makeGetPreSignedUrlAction,
  makeUploadToBucketAction,
  makeSendVideoInfoAction,
} from '../action/video-upload-action';
import { VideoFormValidationStates } from '../model/video-form-validation-state';
import {
  isMakeableTag,
  isDuplicatedTag,
  isImage,
  validateTitle,
  validateDescription,
} from '../helper/validate';
import { ValidationState } from '../../../libs/validation-state/validation-state';

export const useVideoUpload = () => {
  const router = useRouter();
  const video = useVideoFile();
  const user = useUser();

  if (!video.name) {
    router.push(endpoint.hotlist);
  }

  useEffect(() => {
    if (video.name) {
      previewVideo.current.src = URL.createObjectURL(video);
    }
  }, []);

  const previewVideo = useRef<HTMLVideoElement>();
  const tagInput = useRef<HTMLInputElement>();
  const thumbnailInput = useRef<HTMLInputElement>();

  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [textFormData, setTextFormData] = useState(new VideoFormData());
  const [thumbnail, setThumbnail] = useState();
  const [thumbnailObjectURL, setThumbnailObjectURL] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadComplete, setIsUploadComplete] = useState(false);

  const [videoFormValidationStates, setVideoFormValidationStates] = useState(
    new VideoFormValidationStates(),
  );

  const isSubmitabled = Object.keys(videoFormValidationStates).every(state => {
    return !!videoFormValidationStates[state].isValid;
  });

  const getPreSignedUrl = useMutation(makeGetPreSignedUrlAction).mutate;
  const uploadToBucket = useMutation(makeUploadToBucketAction).mutate;
  const sendVideoInfo = useMutation(makeSendVideoInfoAction).mutate;

  const uploadVideoToBucket = async (id: string) => {
    const videoName = `${id}/${video.name}`;
    const { payload } = await getPreSignedUrl(videoName);
    const videoPreSignedUrl = payload;

    return uploadToBucket({ preSignedUrl: videoPreSignedUrl, file: video });
  };

  const uploadThumbnailToBucket = async (id: string) => {
    const thumbnailName = `${id}/${thumbnail.name}`;
    const { payload } = await getPreSignedUrl(thumbnailName);
    const thumbnailPreSignedUrl = payload;

    return uploadToBucket({
      preSignedUrl: thumbnailPreSignedUrl,
      file: thumbnail,
    });
  };

  const makeTag = e => {
    if (e.key !== SPACEBAR) {
      return;
    }

    if (!isMakeableTag(currentTag, tags) || isDuplicatedTag(currentTag, tags)) {
      setCurrentTag('');
      return;
    }

    setTags([...tags, currentTag]);
    setCurrentTag('');
  };

  const uploadVideo = async e => {
    try {
      if (!isSubmitabled) {
        // deprefcated soon
        window.alert('폼을 정확히 작성해주십시오.');
        return;
      }

      setIsUploading(true);

      e.preventDefault();

      const id = v4();
      await uploadVideoToBucket(id);
      // await uploadThumbnailToBucket(id);

      setIsUploading(false);
      setIsUploadComplete(true);

      const res = await sendVideoInfo(
        UploadVideoDetailDtoFactory.makeUploadVideoDetailDTO(
          id,
          user.userId,
          tags,
          textFormData,
        ),
      );

      if (res.error) {
        // error control
        return;
      }

      // console.log(res);
    } catch (err) {
      // console.log(err);
    }
  };

  const closeModal = () => {
    router.push(endpoint.hotlist);
  };

  const showExplorer = e => {
    thumbnailInput.current.click();
  };

  const changeThumbnail = e => {
    const currentFile = thumbnailInput.current.files[0];

    if (!(currentFile && isImage(currentFile.type))) {
      return;
    }

    setThumbnail(currentFile);
    URL.revokeObjectURL(thumbnailObjectURL);
    setThumbnailObjectURL(URL.createObjectURL(currentFile));
  };

  const changeTextFormData = (
    e: React.ChangeEvent<HTMLInputElement>,
    validate: (value: string) => ValidationState,
  ) => {
    const { name, value } = e.target;

    setTextFormData({
      ...textFormData,
      [name]: value,
    });

    setVideoFormValidationStates({
      ...videoFormValidationStates,
      [name]: validate(value),
    });
  };

  const focusTagInput = e => {
    tagInput.current.focus();
  };

  const changeCurrentTag = e => {
    const value = e.target.value;

    if (value === SPACEBAR) {
      return;
    }

    setCurrentTag(e.target.value);
  };

  const deleteTag = clickedTagName => {
    setTags(
      tags.filter(tagname => {
        return tagname !== clickedTagName;
      }),
    );
  };

  const moveBackPage = e => {
    router.push(endpoint.uploadVideoFile);
  };

  const changeVideoTitle = e => {
    changeTextFormData(e, validateTitle);
  };

  const changeVideoDescription = e => {
    changeTextFormData(e, validateDescription);
  };

  return {
    currentTag,
    thumbnail,
    thumbnailInput,
    tags,
    tagInput,
    textFormData,
    moveBackPage,
    previewVideo,
    uploadVideo,
    showExplorer,
    changeThumbnail,
    changeTextFormData,
    focusTagInput,
    changeCurrentTag,
    makeTag,
    deleteTag,
    thumbnailObjectURL,
    videoFormValidationStates,
    isUploading,
    setIsUploading,
    isUploadComplete,
    closeModal,
    changeVideoTitle,
    changeVideoDescription,
  };
};
