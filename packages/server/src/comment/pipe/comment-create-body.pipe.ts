import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { CommentBodyDto } from '../dto/comment-body.dto';

@Injectable()
export class CommentCreateBodyPipe implements PipeTransform {
  public async transform(value: CommentBodyDto): Promise<CommentBodyDto> {
    const { content } = value;

    if (!this.validateContent(content)) {
      throw new BadRequestException();
    }

    return { content };
  }

  private validateContent(content: string): boolean {
    return Boolean(content && content.length > 0);
  }
}
