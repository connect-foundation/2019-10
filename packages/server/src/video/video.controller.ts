import { Controller, Body, Get, Post, Query, UsePipes } from '@nestjs/common';
import { VideoService } from './video.service';

import { GetQueryStringPipe } from '../common/pipes/query-string.pipe';
import { UploadedVideoTableService } from 'src/uploaded-video/uploaded-video-table.service';
import { UploadedVideoInfo } from 'src/uploaded-video/dto/uploaded-video-info.dto';

import { VideoResponseDto } from './dto';
import { QueryStringDto } from '../common/pipes/query-string.pipe/requestDto';

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
  @UsePipes(GetQueryStringPipe)
  public async getVideos(
    @Query() queryStringDto: QueryStringDto,
  ): Promise<VideoResponseDto[]> {
    const { page, sort, period, keyword, limit } = queryStringDto;

    const videos = await this.videoService.findVideos({
      page,
      sort,
      period,
      keyword,
      limit,
    });

    return videos.map(video => new VideoResponseDto(video));
  }
}
