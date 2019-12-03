import { VideoResponseDto } from 'video/dto/video-response.dto';

export class VideosResponseDto {
  public constructor(
    public readonly count: number,
    public readonly data: VideoResponseDto[],
  ) {}
}
