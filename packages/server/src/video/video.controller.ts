import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from '../../../typeorm/src/entity/video.entity';
import { VideosQueryDto } from './dto/videos-query.dto';
import { GetVideosPipe } from '../common/pipes/get-videos.pipe';

@Controller('videos')
export class VideoController {
  public constructor(private readonly videoService: VideoService) {}

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

  @Get('/')
  public async getSearchResults(@Query() query: string): Promise<Video[]> {
    return await this.videoService.findVideosBySearchResults(query);
  }
}
