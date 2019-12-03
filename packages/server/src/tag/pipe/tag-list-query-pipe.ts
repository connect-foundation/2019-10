import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { TagListRequestQueryDto } from 'tag/dto/tag-list-request-query.dto';
import { TagListQueryDto } from 'tag/dto/tag-list-query.dto';

@Injectable()
export class TagListQueryPipe implements PipeTransform {
  public async transform(
    value: TagListRequestQueryDto,
  ): Promise<TagListQueryDto> {
    const { page, keyword } = value;

    if (!this.validateTagQueryPipeDto({ page, keyword })) {
      throw new BadRequestException();
    }

    return {
      page: parseInt(page, 10),
      keyword,
    };
  }

  private validateTagQueryPipeDto({ page }: TagListRequestQueryDto): boolean {
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
