import { Controller, Get, Query } from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from '../../../typeorm/src/entity/video.entity';
import { GetVideosQueryDto } from './video.dto';
import { GetVideosQueryPipe } from '../common/pipes/getVideosQueryPipe';

@Controller('videos')
export class VideoController {
  public constructor(private readonly videoService: VideoService) {}

  @Get('/')
  public async getVideos(
    @Query(GetVideosQueryPipe) getVideosQueryDto: GetVideosQueryDto,
  ): Promise<Video[]> {
    const { page, sort } = getVideosQueryDto;
    return await this.videoService.findVideos({
      page,
      sort,
    });
  }
}
