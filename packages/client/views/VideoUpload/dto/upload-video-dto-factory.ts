import { VideoFormData } from '../model/video-form-data';
import { UploadVideoDetailDTO } from './upload-video-detail-dto';

export class UploadVideoDetailDtoFactory {
  public static makeUploadVideoDetailDTO(
    id: string,
    userId: number,
    tags: string[],
    textFormData: VideoFormData,
  ): UploadVideoDetailDTO {
    return {
      id,
      userId,
      tags,
      ...textFormData,
    };
  }
}
