import { Injectable } from '@nestjs/common';

import { TranscoderNotificationDto } from './dto/elastic-transcoder/transcoder-notification.dto';
import { UploadedVideoTableService } from '../../uploaded-video-table/uploaded-video-table.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from '../../../entity/video.entity';
import { Tag } from '../../../entity/tag.entity';
import { User } from '../../../entity/user.entity';
import { TRANSCODER_NOTIFICATION_STATE } from '../../common/constants';
import { UploadedVideoInfo } from '../../uploaded-video-table/model/uploaded-video-info';

@Injectable()
export class TranscoderWebhookService {
  public constructor(
    private readonly uploadedVideoTableService: UploadedVideoTableService,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  private parseNotificationMessage(
    transcoderNotificationDto: TranscoderNotificationDto,
  ): TranscoderNotificationDto {
    return JSON.parse(transcoderNotificationDto.toString().trim());
  }

  private getSourcePrefix(outputKeyPrefix: string): string {
    return `https://${process.env.BUCKET_NAME}.s3-${process.env.BUCKET_REGION}.amazonaws.com/${outputKeyPrefix}`;
  }

  private getMpdSourceUrl(sourcePrefix: string, playlistName: string): string {
    return `${sourcePrefix}${playlistName}.mpd`;
  }

  private getId(outputKeyPrefix: string): string {
    const path = outputKeyPrefix.split('/');
    const id = path[path.length - 2];

    return id;
  }

  private async deserializeVideoInfo(
    id: string,
    mpdSourceUrl: string,
    sourcePrefix: string,
  ) {
    const videoInfo = await this.uploadedVideoTableService.find(id);
    videoInfo.source = mpdSourceUrl;
    videoInfo.thumbnail = `${sourcePrefix}thumbnail_000014800K.png`;

    return videoInfo;
  }

  private async findOwner(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    return user;
  }

  private async getTags(videoInfo: UploadedVideoInfo): Promise<Tag[]> {
    const tags = await Promise.all(
      videoInfo.tags.map(async (tagName: string) => {
        const tagEntities = await this.tagRepository.find({
          where: { name: tagName },
        });

        const tag = tagEntities[0];

        if (!tag) {
          const tagInfo = this.tagRepository.create({ name: tagName });
          tagInfo.videosCount = 1;
          const newTag = await this.tagRepository.save(tagInfo);

          return newTag;
        }
        tag.videosCount += 1;

        return tag;
      }),
    );

    return tags;
  }

  private async saveVideoInfo(
    videoInfo: UploadedVideoInfo,
    tags: Tag[],
    user: User,
    playtime: number,
  ) {
    const video = this.videoRepository.create({
      title: videoInfo.title,
      description: videoInfo.description,
      source: videoInfo.source,
      thumbnail: videoInfo.thumbnail,
      playtime,
      tags,
      user,
    });

    await this.videoRepository.save(video);
  }

  public async synchronizeVideoInfo(
    transcoderNotificationDto: TranscoderNotificationDto,
  ): Promise<void> {
    const notificationMessage = this.parseNotificationMessage(
      transcoderNotificationDto,
    );

    if (notificationMessage.state === TRANSCODER_NOTIFICATION_STATE.COMPLETED) {
      const sourcePrefix = this.getSourcePrefix(
        notificationMessage.outputKeyPrefix,
      );

      const mpdSourceUrl = this.getMpdSourceUrl(
        sourcePrefix,
        notificationMessage.playlists[0].name,
      );

      const id = this.getId(notificationMessage.outputKeyPrefix);

      const videoInfo = await this.deserializeVideoInfo(
        id,
        mpdSourceUrl,
        sourcePrefix,
      );

      const user = await this.findOwner(videoInfo.userId);

      const tags = await this.getTags(videoInfo);

      await this.saveVideoInfo(
        videoInfo,
        tags,
        user,
        notificationMessage.outputs[0].duration,
      );
    }
  }
}
