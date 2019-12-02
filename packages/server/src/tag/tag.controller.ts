import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { TagService } from './tag.service';

import { TagQueryStringPipe } from './pipe/tag-query.pipe';
import { TagQueryStringDto } from './pipe/query-dto';
import { TagResponseDto } from './dto';

@Controller('tags')
export class TagController {
  public constructor(private readonly tagService: TagService) {}

  @Get('/')
  @UsePipes(TagQueryStringPipe)
  public async getTags(
    @Query() tagQueryStringDto: TagQueryStringDto,
  ): Promise<TagResponseDto[]> {
    const { page, keyword, limit } = tagQueryStringDto;

    const tags = await this.tagService.findTags({ page, keyword, limit });

    return tags.map(tag => new TagResponseDto(tag));
  }
}
