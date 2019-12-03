import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { UserListQueryDto } from 'user/dto/user-list-query.dto';

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
    const onlyNaturalNumberRegex = /^[1-9]\d*$/;
    return onlyNaturalNumberRegex.test(page);
  }
}
