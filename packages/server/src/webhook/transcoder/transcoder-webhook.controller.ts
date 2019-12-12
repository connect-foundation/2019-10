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
      const mpdSourceUrl = `https://${process.env.BUCKET_NAME}.s3-${process.env.BUCKET_REGION}.amazonaws.com/${notificationMessage.outputKeyPrefix}${notificationMessage.playlists[0].name}.mpd`;

      const path = notificationMessage.outputKeyPrefix.split('/');
      const id = path[path.length - 2];

      const videoInfo = await this.uploadedVideoTableService.find(id);
      videoInfo.source = mpdSourceUrl;

      const user = await this.userRepository.find({
        where: { id: videoInfo.userId },
      });

      const tags = await videoInfo.tags.reduce(
        // tslint:disable-next-line: no-any
        async (promiseTagIds: Promise<Tag[]>, tagName: any) => {
          const tagIds = await promiseTagIds;

          const tagEntities = await this.tagRepository.find({
            where: { name: tagName },
          });
          const tag = tagEntities[0];

          if (!tag) {
            const tagInfo = this.tagRepository.create({ name: tagName });
            tagInfo.name = tagName;
            const newTag = await this.tagRepository.save(tagInfo);

            return Promise.resolve([...tagIds, newTag.id]);
          }

          return Promise.resolve([...tagIds, tag.id]);
        },
        Promise.resolve([]),
      );

      const video = this.videoRepository.create({
        title: videoInfo.title,
        description: videoInfo.description,
        source: videoInfo.source,
        thumbnail: 'thumbnail',
        playtime: notificationMessage.outputs[0].duration,
        tags,
        user: user[0],
      });

      await this.videoRepository.save(video);
    }
  }
}
