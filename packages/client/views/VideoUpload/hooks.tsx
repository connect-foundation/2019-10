import { useRouter } from 'next/router';
import { v4 } from 'uuid';
import { useMutation } from 'react-fetching-library';

import { useVideoFile } from '../../components/FileProvider/hooks';
import { useRef, useState } from 'react';
import { TextFormData } from './model/text-form-data';
import { useUser } from '../../components/UserProvider/hooks';
import { UploadVideoDetailDtoFactory } from './dto/upload-video-dto-factory';
import { SPACEBAR, MAX_TAGS_NUMBER, endpoint, fileType } from '../../constants';
import {
  makeGetPreSignedUrlAction,
  makeUploadToBucketAction,
  makeSendVideoInfoAction,
} from './action/video-upload-action';

export const useVideoUpload = () => {
  const router = useRouter();
  const video = useVideoFile();
  const user = useUser();

  const tagInput = useRef<HTMLInputElement>();
  const thumbnailInput = useRef<HTMLInputElement>();

  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [textFormData, setTextFormData] = useState(new TextFormData());
  const [thumbnail, setThumbnail] = useState();
  const [videoObjectURL] = useState(URL.createObjectURL(video));
  const [thumbnailObjectURL, setThumbnailObjectURL] = useState();

  const getPreSignedUrl = useMutation(makeGetPreSignedUrlAction).mutate;
  const uploadToBucket = useMutation(makeUploadToBucketAction).mutate;
  const sendVideoInfo = useMutation(makeSendVideoInfoAction).mutate;

  //////////////////////////////////////////////
  // private
  /////////////////////////////////////////////
  const isImage = (type: string): boolean => {
    return type.includes(fileType.image);
  };

  const isDuplicatedTag = () => {
    return tags.includes(currentTag);
  };

  const isMakeableTag = () => {
    const tagValidationRegex = /^[a-zA-Z0-9-#._]+$/;

    return (
      tagValidationRegex.test(currentTag) && tags.length <= MAX_TAGS_NUMBER
    );
  };

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

  //////////////////////////////////////////////////
  // public
  //////////////////////////////////////////////////
  const makeTag = e => {
    if (e.key !== SPACEBAR) {
      return;
    }

    if (!isMakeableTag() || isDuplicatedTag()) {
      setCurrentTag('');
      return;
    }

    setTags([...tags, currentTag]);
    setCurrentTag('');
  };

  const uploadVideo = async e => {
    try {
      e.preventDefault();

      const id = v4();
      await uploadVideoToBucket(id);
      await uploadThumbnailToBucket(id);

      const res = await sendVideoInfo(
        UploadVideoDetailDtoFactory.makeUploadVideoDetailDTO(
          id,
          user.id,
          tags,
          textFormData,
        ),
      );

      // console.log(res);
    } catch (err) {
      // console.log(err);
    }
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

  const changeTextFormData = e => {
    const { name, value } = e.target;

    setTextFormData({
      ...textFormData,
      [name]: value,
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

  const checkVideoExist = () => {
    if (!video.name) {
      router.push(endpoint.uploadVideoFile);
    }
  };

  const moveBackPage = e => {
    router.push(endpoint.uploadVideoFile);
  };

  return {
    currentTag,
    thumbnail,
    thumbnailInput,
    tags,
    tagInput,
    textFormData,
    moveBackPage,
    videoObjectURL,
    uploadVideo,
    showExplorer,
    changeThumbnail,
    changeTextFormData,
    focusTagInput,
    changeCurrentTag,
    makeTag,
    deleteTag,
    checkVideoExist,
    thumbnailObjectURL,
  };
};
