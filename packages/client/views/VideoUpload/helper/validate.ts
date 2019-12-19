import { ValidationState } from '../../../libs/validation-state/validation-state';
import {
  fileType,
  MAX_TAGS_NUMBER,
  VIDEO_UPLOAD_FORM_VALIDATION_CONDITION,
  VIDEO_UPLOAD_FORM_VALIDATION_MESSAGE,
  TAG_VALIDATION_REGEX,
  VIDEO_UPLOAD_FORM_VALIDATION_REGEX,
} from '../../../constants';
import { ValidationStateFactory } from './validation-state-factory';

const isTitleLengthValid = (title: string): boolean => {
  return title.length <= VIDEO_UPLOAD_FORM_VALIDATION_CONDITION.TITLE_LENGTH;
};

const isValidatedTitleCharacters = (title: string): boolean => {
  return VIDEO_UPLOAD_FORM_VALIDATION_REGEX.VALID_CHARACTERS.test(title);
};

export const validateTitle = (title: string): ValidationState => {
  title = title.trim();

  // 반드시 채워져 있어야함
  if (!title) {
    return ValidationStateFactory.makeFailValidationState(
      VIDEO_UPLOAD_FORM_VALIDATION_MESSAGE.EMPTY_VALUE,
    );
  }

  // 45자 이상 불가능
  if (!isTitleLengthValid(title)) {
    return ValidationStateFactory.makeFailValidationState(
      VIDEO_UPLOAD_FORM_VALIDATION_MESSAGE.TITLE_LENGTH,
    );
  }

  // 특수문자 어디까지만 허용할 것인가
  if (!isValidatedTitleCharacters(title)) {
    return ValidationStateFactory.makeFailValidationState(
      VIDEO_UPLOAD_FORM_VALIDATION_MESSAGE.INVALID_CHARACTERS,
    );
  }

  return ValidationStateFactory.makeSuccessValidationState();
};

const isValidatedDescriptionLength = (description: string): boolean => {
  return (
    description.length <=
    VIDEO_UPLOAD_FORM_VALIDATION_CONDITION.DESCRIPTION_LENGTH
  );
};

const isValidatedDescriptionCharacters = (description: string): boolean => {
  return VIDEO_UPLOAD_FORM_VALIDATION_REGEX.VALID_CHARACTERS.test(description);
};

export const validateDescription = (description: string): ValidationState => {
  description = description.trim();

  // 반드시 채워져 있어야함
  if (!description) {
    return ValidationStateFactory.makeFailValidationState(
      VIDEO_UPLOAD_FORM_VALIDATION_MESSAGE.EMPTY_VALUE,
    );
  }

  // 3000자 이상 불가능
  if (!isValidatedDescriptionLength(description)) {
    return ValidationStateFactory.makeFailValidationState(
      VIDEO_UPLOAD_FORM_VALIDATION_MESSAGE.DESCRIPTION_LENGTH,
    );
  }

  // 특수문자 어디까지만 허용할 것인가
  if (!isValidatedDescriptionCharacters(description)) {
    return ValidationStateFactory.makeFailValidationState(
      VIDEO_UPLOAD_FORM_VALIDATION_MESSAGE.INVALID_CHARACTERS,
    );
  }

  return ValidationStateFactory.makeSuccessValidationState();
};

export const isImage = (type: string): boolean => {
  return type.includes(fileType.image);
};

export const isDuplicatedTag = (currentTag: string, tags: string[]) => {
  return tags.includes(currentTag);
};

export const isMakeableTag = (currentTag: string, tags: string[]) => {
  return (
    TAG_VALIDATION_REGEX.VALID_CHARACTERS.test(currentTag) &&
    tags.length <= MAX_TAGS_NUMBER
  );
};
