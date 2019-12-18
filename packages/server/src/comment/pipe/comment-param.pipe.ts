import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { CommentParamDto } from '../dto/comment-param.dto';
import { NATURAL_NUMBER_REGEX } from '../../common/regexes';

@Injectable()
export class CommentParamPipe implements PipeTransform {
  public async transform(value: CommentParamDto): Promise<CommentParamDto> {
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
    return NATURAL_NUMBER_REGEX.test(id);
  }
}
