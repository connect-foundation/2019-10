import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { VideosRequestParamDto } from '../dto/videos-request-param.dto';
import { VideosParamDto } from '../dto/videos-param';

@Injectable()
export class VideosParamPipe implements PipeTransform {
  public async transform(
    value: VideosRequestParamDto,
  ): Promise<VideosParamDto> {
    const { id } = value;

    if (!this.validateId(id)) {
      throw new BadRequestException();
    }

    return {
      id: parseInt(value.id, 10),
    };
  }

  private validateId(id: string) {
    const parsedId = parseInt(id, 10);
    return !isNaN(parsedId);
  }
}
