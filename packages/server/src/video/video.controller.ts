import { Controller, Body, Get, Post, Query, UsePipes } from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from '../../../typeorm/src/entity/video.entity';
import { VideosQueryDto } from './dto/videos-query.dto';
import { GetVideosPipe } from '../common/pipes/get-videos.pipe';
import { UploadedVideoTableService } from 'src/uploaded-video/uploaded-video-table.service';
import { UploadedVideoInfo } from 'src/uploaded-video/dto/uploaded-video-info.dto';

@Controller('videos')
export class VideoController {
  public constructor(
    private readonly videoService: VideoService,
    private readonly uploadedVideoTableService: UploadedVideoTableService,
  ) {}

  // @Post('/')
  // public async listenTranscoderNotification(
  //   @Body() notificationMessage: TranscoderNotificationDto,
  // ) {
  // tslint:disable-next-line: max-line-length
  //   if (notificationMessage.state === TranscoderNotificationState.completed) {
  // tslint:disable-next-line: max-line-length
  //     const mpdSourceUrl = `https://${process.env.BUCKET_NAME}.s3-${process.env.BUCKET_REGION}.amazonaws.com/${notificationMessage.outputKeyPrefix}${notificationMessage.playlists[0].name}`;

  //     const path = notificationMessage.outputKeyPrefix.split('/');
  //     const id = path[path.find.length - 2];
  //     // console.log(id);

  //     const videoInfo = this.uploadedVideoTableService.find(id);
  //     videoInfo.sourceUrl = mpdSourceUrl;
  //     // console.log(mpdSourceUrl);

  //     // const user;

  //     const tags = await videoInfo.tags.reduce(
  //       // tslint:disable-next-line: no-any
  //       async (promiseResult: Promise<number[]>, tagName: any) => {
  //         const tag = await this.tagRepository.find({
  //           where: { name: tagName },
  //         })[0];

  //         if (!tag) {
  //           const newTag = this.tagRepository.create({ name: tagName });
  //           newTag.name = tagName;
  //           await this.tagRepository.save(newTag);

  //           // tslint:disable-next-line: no-shadowed-variable
  //           const result = await promiseResult;

  //           // console.log(result);

  //           return Promise.resolve([...result, newTag.id]);
  //         }
  //         const result = await promiseResult;
  //         // console.log(result);

  //         return Promise.resolve([...result, tag.id]);
  //       },
  //       Promise.resolve([]),
  //     );

  //     const video = this.videoRepository.create({
  //       title: videoInfo.title,
  //       description: videoInfo.description,
  //       sourceUrl: videoInfo.sourceUrl,
  //       // thumbnail:
  //       playtime: notificationMessage.outputs[0].duration,
  //       tags,
  //     });
  //     // console.log(videoInfo);
  //     // console.log(video);

  //     await this.videoRepository.save(video);
  //   }
  // }

  @Post('upload')
  public saveVideoInfo(@Body() uploadedVideoInfo: UploadedVideoInfo) {
    return this.uploadedVideoTableService.insert(
      uploadedVideoInfo.id,
      uploadedVideoInfo,
    );
  }

  @Get('/')
  @UsePipes(GetVideosPipe)
  public async getVideos(
    @Query() videosQueryDto: VideosQueryDto,
  ): Promise<Video[]> {
    const { page, sort } = videosQueryDto;
    return await this.videoService.findVideos({
      page,
      sort,
    });
  }
}
