import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { CommentsRequestParamDto } from '../dto/comments-request-param.dto';
import { CommentsParamDto } from '../dto/comments-param.dto';

@Injectable()
export class CommentsParamPipe implements PipeTransform {
  public async transform(
    value: CommentsRequestParamDto,
  ): Promise<CommentsParamDto> {
    const { id } = value;

    if (!this.validateParam(id)) {
      throw new BadRequestException();
    }

    return { id: parseInt(id, 10) };
  }

  private validateParam(id: string) {
    const parsedId = parseInt(id, 10);
    return !isNaN(parsedId);
  }
}
