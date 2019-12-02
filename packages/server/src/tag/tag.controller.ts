import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { TagService } from './tag.service';

import { TagQueryStringPipe } from './pipe/tag-query.pipe';
import { TagQueryStringDto } from './pipe/query-dto';
import { TagListResponseDto } from './dto/tag-list-response.dto';

@Controller('tags')
export class TagController {
  public constructor(private readonly tagService: TagService) {}

  @Get('/')
  @UsePipes(TagQueryStringPipe)
  public async getTags(
    @Query() tagQueryStringDto: TagQueryStringDto,
  ): Promise<TagListResponseDto> {
    const { page, keyword } = tagQueryStringDto;

    const [tags, count] = await this.tagService.findTags({
      page,
      keyword,
    });

    return new TagListResponseDto(tags, count);
  }
}
