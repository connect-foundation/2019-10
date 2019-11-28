import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { TagService } from './tag.service';

import { GetTagsPipe } from '../common/pipes/get-tags.pipe';

import { TagsQueryDto, TagResponseDto } from './dto';

@Controller('tags')
export class TagController {
  public constructor(private readonly tagService: TagService) {}

  @Get('/')
  @UsePipes(GetTagsPipe)
  public async getTags(
    @Query() tagsQueryDto: TagsQueryDto,
  ): Promise<TagResponseDto[]> {
    const { page, keyword, limit } = tagsQueryDto;

    const tags = await this.tagService.findTags({ page, keyword, limit });

    return tags.map(tag => new TagResponseDto(tag));
  }
}
