import { Video } from '../../../../typeorm/src/entity/video.entity';
import { VideoInfo } from 'video/model/video-info';

export class VideoListResponseDto {
  public constructor(videoList: Video[], count: number) {
    this.videoList = videoList.map(video => new VideoInfo(video));
    this.count = count;
  }

  public readonly videoList: VideoInfo[];
  public readonly count: number;
}
