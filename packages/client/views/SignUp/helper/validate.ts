import {
  USER_NAME_REGEX,
  USER_FORM_VALIDATION_MESSAGE,
  signUpFormDataMaxLength,
} from '../../../constants';
import { ValidationStateFactory } from './validation-state-factory';
import { ValidationState } from '../../../libs/validation-state/validation-state';

const isValidUsernameLength = (username: string): boolean => {
  return username.length <= signUpFormDataMaxLength.username;
};

const isValidUsernameCharacters = (username: string): boolean => {
  return USER_NAME_REGEX.test(username);
};

export const validateUsername = (username: string): ValidationState => {
  username = username.trim();

  // username은 반드시 채워져야 합니다.
  if (!username) {
    return ValidationStateFactory.makeFailValidationState(
      USER_FORM_VALIDATION_MESSAGE.EMPTY_VALUE,
    );
  }

  // username은 30자 이하여야 합니다.
  if (!isValidUsernameLength(username)) {
    return ValidationStateFactory.makeFailValidationState(
      USER_FORM_VALIDATION_MESSAGE.USERNAME_LENGTH,
    );
  }

  // username은 한글, 숫자, 영어, 공백만 작성 가능합니다.
  if (!isValidUsernameCharacters(username)) {
    return ValidationStateFactory.makeFailValidationState(
      USER_FORM_VALIDATION_MESSAGE.INVALID_CHARACTER,
    );
  }

  return ValidationStateFactory.makeSuccessValidationState();
};

const isValidDescriptionLength = (description: string) => {
  return description.length <= signUpFormDataMaxLength.description;
};

export const validateDescription = (description: string): ValidationState => {
  description = description.trim();

  // description은 1500자 이하로 작성되어야 합니다.
  if (!isValidDescriptionLength(description)) {
    return ValidationStateFactory.makeFailValidationState(
      USER_FORM_VALIDATION_MESSAGE.DESCRIPTION_LENGTH,
    );
  }
  return ValidationStateFactory.makeSuccessValidationState();
};

export const makeUsernameDuplicatedMessage = (username: string) => {
  return `${username}은 이미 등록된 사용자 이름입니다.`;
};
