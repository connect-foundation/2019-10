import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { TagListQueryDto } from 'tag/dto/tag-list-query.dto';
import { NATURAL_NUMBER_REGEX } from 'common/regexes';

@Injectable()
export class TagListQueryPipe implements PipeTransform {
  public async transform(value: TagListQueryDto): Promise<TagListQueryDto> {
    const page = value.page as string;
    const { keyword } = value;

    if (!this.validateTagQueryPipeDto(page)) {
      throw new BadRequestException();
    }

    return {
      page: parseInt(page, 10),
      keyword,
    };
  }

  private validateTagQueryPipeDto(page: string): boolean {
    if (page) {
      return this.validatePage(page);
    }
    return true;
  }

  private validatePage(page: string): boolean {
    return NATURAL_NUMBER_REGEX.test(page);
  }
}
