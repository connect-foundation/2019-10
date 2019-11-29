import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

import { RepliesRequestQueryDto } from '../dto/replies-request-query.dto';
import { RepliesQueryDto } from '../dto/replies-query.dto';

@Injectable()
export class RepliesQueryPipe implements PipeTransform {
  public async transform(
    value: RepliesRequestQueryDto,
  ): Promise<RepliesQueryDto> {
    const { page } = value;

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
