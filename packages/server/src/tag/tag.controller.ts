import { Controller, Get, Query, Param } from '@nestjs/common';

import { TagService } from 'tag/tag.service';
import { TagListQueryPipe } from 'tag/pipe/tag-list-query-pipe';
import { TagListQueryDto } from 'tag/dto/tag-list-query.dto';
import { TagListResponseDto } from 'tag/dto/tag-list-response.dto';
import { IdParserPipe } from 'common/pipes/id-parser/id-parser.pipe';
import { TagVideoListQueryDto } from 'tag/dto/tag-video-list-query.dto';
import { TagVideoListQueryPipe } from 'tag/pipe/tag-videos-query-pipe';
import { TagResponseDto } from 'tag/dto/tag-response.dto';
import { endpoint } from 'common/constants';
import { TagVideoListResponseDto } from './dto/tag-video-list-response.dto';

@Controller(endpoint.tags)
export class TagController {
  public constructor(private readonly tagService: TagService) {}

  @Get('/')
  public async getTagList(
    @Query(null, new TagListQueryPipe()) tagListqueryDto: TagListQueryDto,
  ): Promise<TagListResponseDto> {
    const [tags, count] = await this.tagService.findTags(tagListqueryDto);

    return new TagListResponseDto(tags, count);
  }

  @Get('/:id')
  public async getTagById(
    @Param(IdParserPipe) id: number,
  ): Promise<TagResponseDto> {
    const tag = await this.tagService.findTagById(id);
    return new TagResponseDto(tag);
  }

  @Get('/:id/videos')
  public async getTagVideoList(
    @Param(IdParserPipe) id: number,
    @Query(TagVideoListQueryPipe) tagVideoListQueryDto: TagVideoListQueryDto,
  ): Promise<TagVideoListResponseDto> {
    const [videos, count] = await this.tagService.findTagVideos(
      id,
      tagVideoListQueryDto,
    );
    return new TagVideoListResponseDto(videos, count);
  }
}
