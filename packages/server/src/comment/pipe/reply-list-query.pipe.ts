import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ReplyListQueryDto } from '../dto/reply-list-query.dto';

@Injectable()
export class ReplyListQueryPipe implements PipeTransform {
  public async transform(value: ReplyListQueryDto): Promise<ReplyListQueryDto> {
    const page = value.page as string;

    if (!this.validatePage(page)) {
      throw new BadRequestException();
    }

    return {
      page: parseInt(page, 10),
    };
  }

  private validatePage(page: string) {
    const parsedPage = parseInt(page, 10);
    return !isNaN(parsedPage) && parsedPage > 0;
  }
}
