import { Controller, Post, Body } from '@nestjs/common';
import { TranscoderNotificationDto } from './dto/elastic-transcoder/transcoder-notification.dto';
import { TranscoderNotificationState } from 'src/constants';
import { Repository } from 'typeorm';
import { Video } from '../../../../typeorm/src/entity/video.entity';
import { Tag } from '../../../../typeorm/src/entity/tag.entity';
import { UploadedVideoTableService } from 'src/uploaded-video/uploaded-video-table.service';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('webhook/transcoder')
export class TranscoderWebhookController {
  public constructor(
    private readonly uploadedVideoTableService: UploadedVideoTableService,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  @Post('/')
  public async listenTranscoderNotification(
    @Body() notificationMessage: TranscoderNotificationDto,
  ) {
    notificationMessage = JSON.parse(notificationMessage.toString().trim());
    // console.log(notificationMessage);
    if (notificationMessage.state === TranscoderNotificationState.completed) {
      const mpdSourceUrl = `https://${process.env.BUCKET_NAME}.s3-${process.env.BUCKET_REGION}.amazonaws.com/${notificationMessage.outputKeyPrefix}${notificationMessage.playlists[0].name}.mpd`;
      // console.log(mpdSourceUrl);

      const path = notificationMessage.outputKeyPrefix.split('/');
      const id = path[path.find.length - 2];
      // console.log(id);

      const videoInfo = this.uploadedVideoTableService.find(id);
      videoInfo.sourceUrl = mpdSourceUrl;
      // console.log(mpdSourceUrl);

      // const user;

      const tags = await videoInfo.tags.reduce(
        // tslint:disable-next-line: no-any
        async (promiseResult: Promise<number[]>, tagName: any) => {
          const tag = await this.tagRepository.find({
            where: { name: tagName },
          })[0];

          if (!tag) {
            const newTag = this.tagRepository.create({ name: tagName });
            newTag.name = tagName;
            await this.tagRepository.save(newTag);

            // tslint:disable-next-line: no-shadowed-variable
            const result = await promiseResult;

            // console.log(result);

            return Promise.resolve([...result, newTag.id]);
          }
          const result = await promiseResult;
          // console.log(result);

          return Promise.resolve([...result, tag.id]);
        },
        Promise.resolve([]),
      );

      const video = this.videoRepository.create({
        title: videoInfo.title,
        description: videoInfo.description,
        sourceUrl: videoInfo.sourceUrl,
        // thumbnail:
        playtime: notificationMessage.outputs[0].duration,
        tags,
      });
      // console.log(videoInfo);
      // console.log(video);

      await this.videoRepository.save(video);
    }
  }
}
