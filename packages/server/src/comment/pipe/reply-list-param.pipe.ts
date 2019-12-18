import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ReplyListParamDto } from '../dto/reply-list-param.dto';

@Injectable()
export class ReplyListParamPipe implements PipeTransform {
  public async transform(value: ReplyListParamDto): Promise<ReplyListParamDto> {
    const id = value.id as string;
    const commentId = value.commentId as string;

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
