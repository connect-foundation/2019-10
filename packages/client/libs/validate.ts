import { regex, signUpFormDataMaxLength } from '../constants';
import { ValidateResult } from './model/validateResult';

const validateUserName = (
  userName: string,
  isDuplicated: boolean,
): ValidateResult => {
  if (isDuplicated) {
    return new ValidateResult(
      false,
      `닉네임 '${userName}'을 사용중인 회원이 존재합니다. 다른 닉네임을 사용해주시길 바랍니다.`,
    );
  }
  if (!userName) {
    return new ValidateResult(true, '');
  }
  if (userName.match(regex.userName)) {
    return new ValidateResult(true, '');
  }
  if (userName.length > signUpFormDataMaxLength.username) {
    return new ValidateResult(
      false,
      `${signUpFormDataMaxLength.username}자 이하로 작성해주세요.`,
    );
  }
  return new ValidateResult(false, '특수문자는 사용이 불가능합니다.');
};

const validateDescription = (description: string): ValidateResult => {
  if (description && description.length > signUpFormDataMaxLength.username) {
    return new ValidateResult(
      false,
      `${signUpFormDataMaxLength.description}자 이하로 작성해주세요.`,
    );
  }
  return new ValidateResult(true, '');
};

export { validateUserName, validateDescription };
