import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { VideoService } from './video.service';

import { GetVideosPipe } from '../common/pipes/get-videos.pipe';

import { VideosQueryDto, VideoResponseDto } from './dto';

@Controller('videos')
export class VideoController {
  public constructor(private readonly videoService: VideoService) {}

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
