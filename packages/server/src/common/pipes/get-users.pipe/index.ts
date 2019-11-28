import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { GetUsersPipeDto } from './dto';
import { UsersQueryDto } from 'src/user/dto/users-query.dto';

const defaultValue: UsersQueryDto = {
  page: 1,
  limit: 5,
};

@Injectable()
export class GetUsersPipe implements PipeTransform {
  public async transform(getUsersPipeDto: GetUsersPipeDto) {
    const { page, keyword, limit } = getUsersPipeDto;

    const value = defaultValue;

    if (!this.validateGetUsersPipeDto(getUsersPipeDto)) {
      throw new BadRequestException();
    }

    value.page = parseInt(page, 10);
    value.keyword = keyword;
    value.limit = parseInt(limit, 10);

    return value;
  }

  private validateGetUsersPipeDto({ page, limit }: GetUsersPipeDto): boolean {
    if (limit) {
      return this.validateLimit(limit);
    }
    return this.validatePage(page);
  }

  private validatePage(page: string): boolean {
    const parsedPage = parseInt(page, 10);
    return page && !isNaN(parsedPage) && parsedPage > 0;
  }

  private validateLimit(limit: string): boolean {
    const parsedLimit = parseInt(limit, 10);
    return limit && !isNaN(parsedLimit) && parsedLimit === 5;
  }
}
