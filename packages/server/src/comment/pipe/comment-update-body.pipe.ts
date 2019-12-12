import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { CommentBodyDto } from '../dto/comment-body.dto';

@Injectable()
export class CommentUpdateBodyPipe implements PipeTransform {
  public async transform(value: CommentBodyDto): Promise<CommentBodyDto> {
    const { content } = value;

    if (!this.validateContent(content)) {
      throw new BadRequestException();
    }

    return { content };
  }

  private validateContent(content: string): boolean {
    if (typeof content === 'string') {
      return content.length > 0;
    }

    return content === undefined;
  }
}
