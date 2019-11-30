import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagsResponseDto } from './dto';
import { PageParserPipe } from '../common/pipes/page-parser/page-parser.pipe';

@Controller('tags')
export class TagController {
  public constructor(private readonly tagService: TagService) {}

  @Get('/')
  @UsePipes(PageParserPipe)
  public async getHotTags(
    @Query('page') page: number,
  ): Promise<TagsResponseDto[]> {
    const Tags = await this.tagService.findHotTags(page);
    return Tags.map(tag => new TagsResponseDto(tag));
  }
}
