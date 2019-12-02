import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { UserRequestQueryStringPipeDto } from './request-query-dto';
import { UserQueryStringDto } from './query-dto';

@Injectable()
export class UserQueryStringPipe implements PipeTransform {
  public async transform(
    value: UserRequestQueryStringPipeDto,
  ): Promise<UserQueryStringDto> {
    const { page, keyword } = value;

    if (!this.validateUserRequestQueryStringPipeDto({ page, keyword })) {
      throw new BadRequestException();
    }

    return {
      page: parseInt(page, 10),
      keyword,
    };
  }

  private validateUserRequestQueryStringPipeDto({
    page,
  }: UserRequestQueryStringPipeDto): boolean {
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
