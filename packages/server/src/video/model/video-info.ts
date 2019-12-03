import { VideoUserDto } from 'video/dto/video-user.dto';
import { Video } from '../../../../typeorm/src/entity/video.entity';

export class VideoInfo {
  public constructor(videoEntity: Video) {
    this.id = videoEntity.id;
    this.title = videoEntity.title;
    this.description = videoEntity.description;
    this.sourceUrl = videoEntity.sourceUrl;
    this.thumbnail = videoEntity.thumbnail;
    this.playtime = (videoEntity.playtime as unknown) as string;
    this.likedUsersCount = videoEntity.likedUsersCount;
    this.commentsCount = videoEntity.commentsCount;
    this.views = videoEntity.views;
    this.popularity = videoEntity.popularity;
    this.createdAt = videoEntity.getCreatedAt();
    this.updatedAt = videoEntity.getUpdatedAt();
    this.user = videoEntity.user;
  }

  public readonly id: number;
  public readonly title: string;
  public readonly description: string;
  public readonly sourceUrl: string;
  public readonly thumbnail: string;
  public readonly playtime: string;
  public readonly likedUsersCount: number;
  public readonly commentsCount: number;
  public readonly views: number;
  public readonly popularity: number;
  public readonly createdAt: string;
  public readonly updatedAt: string;
  public readonly user: VideoUserDto;
}
