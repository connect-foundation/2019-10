import { Tag } from '../../../entity/tag.entity';
import { VideoTagResponse } from './video-tag-response.dto';

export class VideoTagListResponseDTO {
  public constructor(tagList: Tag[]) {
    this.data = tagList.map(tag => new VideoTagResponse(tag));
  }

  public readonly data: VideoTagResponse[];
}
