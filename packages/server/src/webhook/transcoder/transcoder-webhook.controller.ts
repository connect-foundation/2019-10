import { Controller, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Video } from '../../../entity/video.entity';
import { Tag } from '../../../entity/tag.entity';
import { User } from '../../../entity/user.entity';
import { UploadedVideoTableService } from '../../uploaded-video-table/uploaded-video-table.service';
import { TranscoderNotificationState } from '../../common/constants';
import { TranscoderNotificationDto } from './dto/elastic-transcoder/transcoder-notification.dto';

@Controller('webhook/transcoder')
export class TranscoderWebhookController {
  public constructor(
    private readonly uploadedVideoTableService: UploadedVideoTableService,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @Post('/')
  public async listenTranscoderNotification(
    @Body() notificationMessage: TranscoderNotificationDto,
  ) {
    notificationMessage = JSON.parse(notificationMessage.toString().trim());

    if (notificationMessage.state === TranscoderNotificationState.completed) {
      const sourcePrefix = `https://${process.env.BUCKET_NAME}.s3-${process.env.BUCKET_REGION}.amazonaws.com/${notificationMessage.outputKeyPrefix}`;
      const mpdSourceUrl = `${sourcePrefix}${notificationMessage.playlists[0].name}.mpd`;

      const path = notificationMessage.outputKeyPrefix.split('/');
      const id = path[path.length - 2];

      const videoInfo = await this.uploadedVideoTableService.find(id);
      videoInfo.source = mpdSourceUrl;
      videoInfo.thumbnail = `${sourcePrefix}thumbnail_000014800K.png`;

      const user = await this.userRepository.find({
        where: { id: videoInfo.userId },
      });

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

      const video = this.videoRepository.create({
        title: videoInfo.title,
        description: videoInfo.description,
        source: videoInfo.source,
        thumbnail: videoInfo.thumbnail,
        playtime: notificationMessage.outputs[0].duration,
        tags,
        user: user[0],
      });

      await this.videoRepository.save(video);
    }

    return true;
  }
}
