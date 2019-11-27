import { Controller, Post, Body } from '@nestjs/common';
import { TranscoderNotificationDto } from './dto/elastic-transcoder/transcoder-notification.dto';
import { TranscoderNotificationState } from 'src/constants';
import { Repository } from 'typeorm';
import { Video } from '../../../../typeorm/src/entity/video.entity';
import { Tag } from '../../../../typeorm/src/entity/tag.entity';
import { UploadedVideoTableService } from 'src/uploaded-video-table/uploaded-video-table.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../../typeorm/src/entity/user.entity';

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
    // console.log(notificationMessage);
    if (notificationMessage.state === TranscoderNotificationState.completed) {
      const mpdSourceUrl = `https://${process.env.BUCKET_NAME}.s3-${process.env.BUCKET_REGION}.amazonaws.com/${notificationMessage.outputKeyPrefix}${notificationMessage.playlists[0].name}.mpd`;

      const path = notificationMessage.outputKeyPrefix.split('/');
      const id = path[path.length - 2];

      const videoInfo = this.uploadedVideoTableService.find(id);
      videoInfo.source = mpdSourceUrl;

      const user = await this.userRepository.find({ where: { id: 0 } });

      const tags = await videoInfo.tags.reduce(
        // tslint:disable-next-line: no-any
        async (promiseTagIds: Promise<Tag[]>, tagName: any) => {
          const tagIds = await promiseTagIds;

          const tagEntities = await this.tagRepository.find({
            where: { name: tagName },
          });
          const tag = tagEntities[0];

          if (!tag) {
            const newTag = this.tagRepository.create({ name: tagName });
            newTag.name = tagName;
            await this.tagRepository.save(newTag);

            return Promise.resolve([...tagIds, newTag]);
          }

          return Promise.resolve([...tagIds, tag]);
        },
        Promise.resolve([]),
      );

      const video = this.videoRepository.create({
        title: videoInfo.title,
        description: videoInfo.description,
        sourceUrl: videoInfo.source,
        thumbnail: 'thumbnail',
        playtime: notificationMessage.outputs[0].duration,
        tags,
        user: user[0],
      });

      await this.videoRepository.save(video);
    }
  }
}
