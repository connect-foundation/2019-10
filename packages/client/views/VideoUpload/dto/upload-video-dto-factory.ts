import { TextFormData } from '../model/text-form-data';

export interface UploadVideoDetailDTO {
  id: string;
  userId: number;
  title: string;
  description: string;
  tags: string[];
}

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
