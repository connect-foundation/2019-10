import { regex, signUpFormDataMaxLength } from '../constants';

const validateUserName = (userName: string): [boolean, string] => {
  if (userName.length === 0) {
    return [true, ''];
  }
  if (userName.match(regex.userName)) {
    return [true, ''];
  }
  if (userName.length > signUpFormDataMaxLength.username) {
    return [
      false,
      `${signUpFormDataMaxLength.username}자 이하로 작성해주세요.`,
    ];
  }
  return [false, '특수문자는 사용이 불가능합니다.'];
};

const validateDescription = (description: string): [boolean, string] => {
  if (description.length > signUpFormDataMaxLength.username) {
    return [
      false,
      `${signUpFormDataMaxLength.description}자 이하로 작성해주세요.`,
    ];
  }
  return [true, ''];
};

export { validateUserName, validateDescription };
