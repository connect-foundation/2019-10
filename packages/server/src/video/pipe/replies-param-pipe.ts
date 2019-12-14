import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

import { RepliesRequestParamDto } from '../dto/replies-request-param.dto';
import { RepliesParamDto } from '../dto/replies-param.dto';

@Injectable()
export class RepliesParamPipe implements PipeTransform {
  public async transform(
    value: RepliesRequestParamDto,
  ): Promise<RepliesParamDto> {
    const { id, commentId } = value;

    if (!this.validateId(id) || !this.validateId(commentId)) {
      throw new BadRequestException();
    }

    return {
      id: parseInt(id, 10),
      commentId: parseInt(commentId, 10),
    };
  }

  private validateId(id: string) {
    const parsedId = parseInt(id, 10);
    return !isNaN(parsedId) && parsedId > 0;
  }
}
