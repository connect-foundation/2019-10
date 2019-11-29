import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { TagService } from './tag.service';

import { GetQueryStringPipe } from '../common/pipes/query-string.pipe';
import { QueryStringDto } from '../common/pipes/query-string.pipe/requestDto';
import { TagResponseDto } from './dto';

@Controller('tags')
export class TagController {
  public constructor(private readonly tagService: TagService) {}

  @Get('/')
  @UsePipes(GetQueryStringPipe)
  public async getTags(
    @Query() queryStringDto: QueryStringDto,
  ): Promise<TagResponseDto[]> {
    const { page, keyword, limit } = queryStringDto;

    const tags = await this.tagService.findTags({ page, keyword, limit });

    return tags.map(tag => new TagResponseDto(tag));
  }
}
