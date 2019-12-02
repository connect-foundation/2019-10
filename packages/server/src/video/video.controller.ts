import { Controller, Body, Get, Post, Query, UsePipes } from '@nestjs/common';
import { VideoService } from './video.service';

import { UploadedVideoTableService } from 'src/uploaded-video/uploaded-video-table.service';
import { UploadedVideoInfo } from 'src/uploaded-video/dto/uploaded-video-info.dto';

import { VideoResponseDto } from './dto';
import { VideoQueryStringPipe } from './pipe/video-query.pipe';
import { VideoQueryStringDto } from './pipe/query-dto';

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
  @UsePipes(VideoQueryStringPipe)
  public async getVideos(
    @Query() videoQueryStringDto: VideoQueryStringDto,
  ): Promise<VideoResponseDto[]> {
    const { page, sort, period, keyword } = videoQueryStringDto;

    const videos = await this.videoService.findVideos({
      page,
      sort,
      period,
      keyword,
    });

    return videos.map(video => new VideoResponseDto(video));
  }
}
