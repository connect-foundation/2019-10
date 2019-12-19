import {
  Controller,
  Get,
  Query,
  Param,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { TagService } from './tag.service';
import { TagResponseDto } from './dto/tag-response.dto';
import { TagListQueryDto } from './dto/tag-list-query.dto';
import { TagListResponseDto } from './dto/tag-list-response.dto';
import { TagVideoListQueryDto } from './dto/tag-video-list-query.dto';
import { TagVideoListResponseDto } from './dto/tag-video-list-response.dto';
import { IdParserPipe } from '../common/pipes/id-parser/id-parser.pipe';
import { TagVideoListQueryPipe } from './pipe/tag-videos-query-pipe';
import { TagListQueryPipe } from './pipe/tag-list-query-pipe';
import { endpoint } from '../common/constants';

@Controller(endpoint.tags)
export class TagController {
  public constructor(private readonly tagService: TagService) {}

  @Get('/')
  public async getTagList(
    @Query(new TagListQueryPipe()) tagListqueryDto: TagListQueryDto,
  ): Promise<TagListResponseDto> {
    const [tags, count] = await this.tagService.findTags(tagListqueryDto);

    return new TagListResponseDto(tags, count);
  }

  @Get('/:id')
  public async getTagById(
    @Param(new IdParserPipe()) id: number,
  ): Promise<TagResponseDto> {
    try {
      const tag = await this.tagService.findTagById(id);
      return new TagResponseDto(tag);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  @Get('/:id/videos')
  public async getTagVideoList(
    @Param(new IdParserPipe()) id: number,
    @Query(new TagVideoListQueryPipe())
    tagVideoListQueryDto: TagVideoListQueryDto,
  ): Promise<TagVideoListResponseDto> {
    try {
      const [videos, count] = await this.tagService.findTagVideos(
        id,
        tagVideoListQueryDto,
      );
      return new TagVideoListResponseDto(videos, count);
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
}
