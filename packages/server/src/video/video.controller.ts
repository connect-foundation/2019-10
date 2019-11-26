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
