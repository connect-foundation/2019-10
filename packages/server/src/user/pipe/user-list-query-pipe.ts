import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { UserListQueryDto } from 'user/dto/user-list-query.dto';
import { NATURAL_NUMBER } from 'common/regexes';

@Injectable()
export class UserListQueryPipe implements PipeTransform {
  public async transform(value: UserListQueryDto): Promise<UserListQueryDto> {
    const page = value.page as string;
    const { keyword } = value;

    if (!this.validateUserQueryPipeDto(page)) {
      throw new BadRequestException();
    }

    return {
      page: parseInt(page, 10),
      keyword,
    };
  }

  private validateUserQueryPipeDto(page: string): boolean {
    if (page) {
      return this.validatePage(page);
    }
    return true;
  }

  private validatePage(page: string): boolean {
    return NATURAL_NUMBER.test(page);
  }
}
