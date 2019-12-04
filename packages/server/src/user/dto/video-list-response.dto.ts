import { VideoResponseDto } from './video-response.dto';
import { Video } from '../../../../typeorm/src/entity/video.entity';
import { UserVideoInfo } from 'user/model/user-video-info';

export class UserVideoListResponseDto {
  public constructor(videoList: Video[], count: number) {
    this.data = videoList.map(video => new UserVideoInfo(video));
    this.count = count;
  }

  public readonly data: VideoResponseDto[];
  public readonly count: number;
}
