import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { TagRequestQueryStringPipeDto } from './request-query-dto';
import { TagQueryStringDto } from './query-dto';

const defaultValue: TagQueryStringDto = {
  page: 1,
  limit: 5,
};

@Injectable()
export class TagQueryStringPipe implements PipeTransform {
  public async transform(
    tagRequestQueryStringPipeDto: TagRequestQueryStringPipeDto,
  ) {
    const { page, keyword, limit } = tagRequestQueryStringPipeDto;

    const value = defaultValue;

    if (
      !this.validateTagRequestQueryStringPipeDto(tagRequestQueryStringPipeDto)
    ) {
      throw new BadRequestException();
    }

    value.page = parseInt(page, 10);
    value.keyword = keyword;
    value.limit = parseInt(limit, 10);

    return value;
  }

  private validateTagRequestQueryStringPipeDto({
    page,
    limit,
  }: TagRequestQueryStringPipeDto): boolean {
    if (limit) {
      return this.validateLimit(limit);
    }
    return this.validatePage(page);
  }

  private validatePage(page: string): boolean {
    const regx = /^[0-9]+$/;
    if (!regx.test(page)) {
      return false;
    }

    const parsedPage = parseInt(page, 10);
    return page && !isNaN(parsedPage) && parsedPage > 0;
  }

  private validateLimit(limit: string): boolean {
    const parsedLimit = parseInt(limit, 10);
    return limit && !isNaN(parsedLimit) && parsedLimit === 5;
  }
}
