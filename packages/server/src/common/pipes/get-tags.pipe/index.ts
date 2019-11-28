import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { GetTagsPipeDto } from './dto';
import { TagsQueryDto } from 'src/tag/dto/tags-query.dto';

const defaultValue: TagsQueryDto = {
  page: 1,
  limit: 5,
};

@Injectable()
export class GetTagsPipe implements PipeTransform {
  public async transform(getTagsPipeDto: GetTagsPipeDto) {
    const { page, keyword, limit } = getTagsPipeDto;

    const value = defaultValue;

    if (!this.validateGetTagsPipeDto(getTagsPipeDto)) {
      throw new BadRequestException();
    }

    value.page = parseInt(page, 10);
    value.keyword = keyword;
    value.limit = parseInt(limit, 10);

    return value;
  }

  private validateGetTagsPipeDto({ page, limit }: GetTagsPipeDto): boolean {
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
