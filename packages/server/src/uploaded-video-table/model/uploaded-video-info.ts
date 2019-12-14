import { UploadedVideoInfoDto } from '../../video/dto/uploaded-video-info.dto';

export class UploadedVideoInfo {
  public readonly id: string;
  public readonly title: string;
  public readonly description: string;
  public readonly userId: number;
  public readonly tags: number[];
  public source: string;

  public constructor(uploadedVideoInfoDto: UploadedVideoInfoDto) {
    this.id = uploadedVideoInfoDto.id;
    this.title = uploadedVideoInfoDto.title;
    this.description = uploadedVideoInfoDto.description;
    this.userId = uploadedVideoInfoDto.userId;
    this.tags = uploadedVideoInfoDto.tags;
    this.source = '';
  }
}
