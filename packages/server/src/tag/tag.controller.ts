import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { endpoint } from '../common/constants';

import { TagService } from './tag.service';
import { TagListQueryPipe } from './pipe/tag-list-query-pipe';
import { TagListQueryDto } from './dto/tag-list-query.dto';
import { TagListResponseDto } from './dto/tag-list-response.dto';

@Controller(endpoint.tags)
export class TagController {
  public constructor(private readonly tagService: TagService) {}

  @Get('/')
  public async getTags(
    @Query(null, new TagListQueryPipe()) tagListqueryDto: TagListQueryDto,
  ): Promise<TagListResponseDto> {
    try {
      const [tags, count] = await this.tagService.findTags(tagListqueryDto);

      return new TagListResponseDto(tags, count);
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
