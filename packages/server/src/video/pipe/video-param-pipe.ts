import { Injectable, BadRequestException } from '@nestjs/common';
import { PipeTransform } from '@nestjs/common/interfaces';

import { VideoRequestParamDto } from 'video/dto/video-request-param.dto';
import { VideoParamDto } from 'video/dto/video-param.dto';

@Injectable()
export class VideoParamPipe implements PipeTransform {
  public async transform(value: VideoRequestParamDto): Promise<VideoParamDto> {
    const { id } = value;

    if (!this.validateId(id)) {
      throw new BadRequestException();
    }

    return {
      id: parseInt(id, 10),
    };
  }

  private validateId(id: string) {
    const parsedId = parseInt(id, 10);
    return !isNaN(parsedId);
  }
}
