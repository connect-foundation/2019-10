import { Controller, Get, Query } from '@nestjs/common';
import { endpoint } from 'common/constants';

import { TagService } from 'tag/tag.service';

import { TagListQueryPipe } from 'tag/pipe/tag-list-query-pipe';
import { TagListQueryDto } from 'tag/dto/tag-list-query.dto';
import { TagListResponseDto } from 'tag/dto/tag-list-response.dto';

@Controller(endpoint.tags)
export class TagController {
  public constructor(private readonly tagService: TagService) {}

  @Get('/')
  public async getTags(
    @Query(null, new TagListQueryPipe()) tagListqueryDto: TagListQueryDto,
  ): Promise<TagListResponseDto> {
    const [tags, count] = await this.tagService.findTags(tagListqueryDto);

    return new TagListResponseDto(tags, count);
  }
}
