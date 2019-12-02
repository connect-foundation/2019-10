import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { TagRequestQueryStringPipeDto } from './request-query-dto';
import { TagQueryStringDto } from './query-dto';

@Injectable()
export class TagQueryStringPipe implements PipeTransform {
  public async transform(
    value: TagRequestQueryStringPipeDto,
  ): Promise<TagQueryStringDto> {
    const { page, keyword } = value;

    if (!this.validateTagRequestQueryStringPipeDto({ page, keyword })) {
      throw new BadRequestException();
    }

    return {
      page: parseInt(page, 10),
      keyword,
    };
  }

  private validateTagRequestQueryStringPipeDto({
    page,
  }: TagRequestQueryStringPipeDto): boolean {
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
