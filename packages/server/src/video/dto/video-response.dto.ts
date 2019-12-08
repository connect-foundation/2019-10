import { Video } from '../../../entity/video.entity';
import { VideoUserDto } from './video-user.dto';
import { LikedVideo } from '../model/liked-video';

export class VideoResponseDto {
  public constructor(video: Video, likes?: LikedVideo[]) {
    this.id = video.id;
    this.title = video.title;
    this.description = video.description;
    this.source = video.source;
    this.thumbnail = video.thumbnail;
    this.playtime = (video.playtime as unknown) as string;
    this.likedUsersCount = video.likedUsersCount;
    this.commentsCount = video.commentsCount;
    this.views = video.views;
    this.popularity = video.popularity;
    this.createdAt = video.getCreatedAt();
    this.updatedAt = video.getUpdatedAt();
    this.user = video.user;
    this.likedByUser = Boolean(likes && likes.length > 0);
  }

  public readonly id: number;
  public readonly title: string;
  public readonly description: string;
  public readonly source: string;
  public readonly thumbnail: string;
  public readonly playtime: string;
  public readonly likedUsersCount: number;
  public readonly commentsCount: number;
  public readonly views: number;
  public readonly popularity: number;
  public readonly createdAt: string;
  public readonly updatedAt: string;
  public readonly user: VideoUserDto;
  public readonly likedByUser: boolean;
}
