import { TextFormData } from '../model/text-form-data';
import { UploadVideoDetailDTO } from './upload-video-detail-dto';

export class UploadVideoDetailDtoFactory {
  public static makeUploadVideoDetailDTO(
    id: string,
    userId: number,
    tags: string[],
    textFormData: TextFormData,
  ): UploadVideoDetailDTO {
    return {
      id,
      userId,
      tags,
      ...textFormData,
    };
  }
}
