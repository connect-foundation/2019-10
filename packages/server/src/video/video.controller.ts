import { Controller, Body, Get, Post, Query, UsePipes } from '@nestjs/common';
import { VideoService } from './video.service';

import { GetVideosPipe } from '../common/pipes/get-videos.pipe';
import { UploadedVideoTableService } from 'src/uploaded-video-table/uploaded-video-table.service';
import { UploadedVideoInfoDto } from 'src/video/dto/uploaded-video-info.dto';
import { VideosQueryDto, VideoResponseDto } from './dto';
import { UploadedVideoInfo } from 'src/uploaded-video-table/model/uploaded-video-info';

@Controller('videos')
export class VideoController {
  public constructor(
    private readonly videoService: VideoService,
    private readonly uploadedVideoTableService: UploadedVideoTableService,
  ) {}

  @Post('upload')
  public saveVideoInfo(@Body() uploadedVideoInfoDto: UploadedVideoInfoDto) {
    return this.uploadedVideoTableService.insert(
      uploadedVideoInfoDto.id,
      new UploadedVideoInfo(uploadedVideoInfoDto),
    );
  }

  @Get('/')
  @UsePipes(GetVideosPipe)
  public async getVideos(
    @Query() videosQueryDto: VideosQueryDto,
  ): Promise<VideoResponseDto[]> {
    const { page, sort, period } = videosQueryDto;

    const videos = await this.videoService.findVideos({
      page,
      sort,
      period,
    });

    return videos.map(video => new VideoResponseDto(video));
  }
}
