import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { CommentListParamDto } from '../dto/comment-list-param.dto';

@Injectable()
export class CommentListParamPipe implements PipeTransform {
  public async transform(
    value: CommentListParamDto,
  ): Promise<CommentListParamDto> {
    const id = value.id as string;

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
