import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

import { TagVideoListQueryDto } from 'tag/dto/tag-video-list-query.dto';
import { NATURAL_NUMBER_REGEX } from 'common/regexes';
import { LATEST, POPULAR } from 'common/constants';

@Injectable()
export class TagVideoListQueryPipe implements PipeTransform {
  public async transform(
    value: TagVideoListQueryDto,
  ): Promise<TagVideoListQueryDto> {
    const page = value.page as string;
    const sort = value.sort;

    if (!this.validateTagVideosQueryPipeDto(page, sort)) {
      throw new BadRequestException();
    }

    return {
      page: parseInt(page, 10),
      sort,
    };
  }

  private validateTagVideosQueryPipeDto(page: string, sort: string): boolean {
    return this.validatePage(page) && this.validateSort(sort);
  }

  private validatePage(page: string): boolean {
    return NATURAL_NUMBER_REGEX.test(page);
  }

  private validateSort(sort: string): boolean {
    return sort === LATEST || sort === POPULAR;
  }
}
