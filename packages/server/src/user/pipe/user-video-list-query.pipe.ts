import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { UserVideoListQueryDto } from '../../user/dto/user-video-list-query.dto';
import { POPULAR, LATEST } from '../../common/constants';
import { NATURAL_NUMBER_REGEX } from '../../common/regexes';

@Injectable()
export class UserVideoListQueryPipe implements PipeTransform {
  public async transform(
    value: UserVideoListQueryDto,
  ): Promise<UserVideoListQueryDto> {
    const page = value.page as string;
    const { sort } = value;

    if (!this.validateQuery({ page, sort })) {
      throw new BadRequestException();
    }

    return {
      page: parseInt(page, 10),
      sort,
    };
  }

  private validateQuery({ page, sort }): boolean {
    return this.validatePage(page) && this.validateSort(sort);
  }

  private validatePage(page: string): boolean {
    return NATURAL_NUMBER_REGEX.test(page);
  }

  private validateSort(sort: string): boolean {
    return sort && (sort === POPULAR || sort === LATEST);
  }
}
