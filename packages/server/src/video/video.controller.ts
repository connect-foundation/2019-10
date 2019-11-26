import {
  Controller,
  Body,
  Get,
  Query,
  UsePipes,
  Param,
  NotFoundException,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { VideoService } from './video.service';

import { GetVideosPipe } from '../common/pipes/get-videos.pipe';
import { UploadedVideoTableService } from 'src/uploaded-video/uploaded-video-table.service';
import { UploadedVideoInfo } from 'src/uploaded-video/dto/uploaded-video-info.dto';

import { VideosQueryDto, VideoResponseDto } from './dto';

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
  ): Promise<VideoResponseDto[]> {
    const videos = await this.videoService.findVideos(videosQueryDto);

    return videos.map(video => new VideoResponseDto(video));
  }

  @Get('/:id')
  public async getVideo(@Param('id') id: string): Promise<VideoResponseDto> {
    // TODO: merge 후, id 변환 pipe 사용
    const video = await this.videoService.findVideo(parseInt(id, 10));

    if (!video) {
      throw new NotFoundException();
    }

    return new VideoResponseDto(video);
  }
}
