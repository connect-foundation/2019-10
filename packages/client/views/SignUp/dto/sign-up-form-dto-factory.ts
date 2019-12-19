import { SignUpFormDTO } from './sign-up-form-dto';

export class SignUpFormDTOFactory {
  public static makeSignUpFormDTO(
    username: string,
    description: string,
    isAgreed: boolean,
  ): SignUpFormDTO {
    return {
      username,
      description,
      isAgreed,
    };
  }
}
