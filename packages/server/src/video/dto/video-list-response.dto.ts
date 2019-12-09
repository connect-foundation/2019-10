import { Video } from '../../../entity/video.entity';
import { VideoInfo } from '../model/video-info';

export class VideoListResponseDto {
  public constructor(videoList: Video[], count: number) {
    this.data = videoList.map(video => new VideoInfo(video));
    this.count = count;
  }

  public readonly data: VideoInfo[];
  public readonly count: number;
}
