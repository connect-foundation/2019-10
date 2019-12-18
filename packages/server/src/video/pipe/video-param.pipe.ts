import { Injectable, BadRequestException } from '@nestjs/common';
import { PipeTransform } from '@nestjs/common/interfaces';

import { VideoParamDto } from '../dto/video-param.dto';

@Injectable()
export class VideoParamPipe implements PipeTransform {
  public async transform(value: VideoParamDto): Promise<VideoParamDto> {
    const id = value.id as string;

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
