import { SignUpFormDTO } from './sign-up-form-dto';

export class UploadVideoDetailDtoFactory {
  public static makeUploadVideoDetailDTO(
    username: string,
    description: string,
  ): SignUpFormDTO {
    return {
      username,
      description,
    };
  }
}
