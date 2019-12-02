import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { UserRequestQueryStringPipeDto } from './request-query-dto';
import { UserQueryStringDto } from './query-dto';

const defaultValue: UserQueryStringDto = {
  page: 1,
  limit: 5,
};

@Injectable()
export class UserQueryStringPipe implements PipeTransform {
  public async transform(
    userRequestQueryStringPipeDto: UserRequestQueryStringPipeDto,
  ) {
    const { page, keyword, limit } = userRequestQueryStringPipeDto;

    const value = defaultValue;

    if (
      !this.validateUserRequestQueryStringPipeDto(userRequestQueryStringPipeDto)
    ) {
      throw new BadRequestException();
    }

    value.page = parseInt(page, 10);
    value.keyword = keyword;
    value.limit = parseInt(limit, 10);

    return value;
  }

  private validateUserRequestQueryStringPipeDto({
    page,
    limit,
  }: UserRequestQueryStringPipeDto): boolean {
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
