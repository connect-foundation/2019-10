import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { UserListRequestQueryDto } from 'user/dto/user-list-request-query.dto';
import { UserListQueryDto } from 'user/dto/user-list-query.dto';

@Injectable()
export class UserListQueryPipe implements PipeTransform {
  public async transform(
    value: UserListRequestQueryDto,
  ): Promise<UserListQueryDto> {
    const { page, keyword } = value;

    if (!this.validateUserQueryPipeDto({ page, keyword })) {
      throw new BadRequestException();
    }

    return {
      page: parseInt(page, 10),
      keyword,
    };
  }

  private validateUserQueryPipeDto({ page }: UserListRequestQueryDto): boolean {
    if (page) {
      return this.validatePage(page);
    }
    return true;
  }

  private validatePage(page: string): boolean {
    const onlyNaturalNumberRegex = /^[1-9]\d*$/;
    return onlyNaturalNumberRegex.test(page);
  }
}
