import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import {
  TAG_ITEMS_PER_PAGE,
  TAG_QUERY_SELECT_COLUMNS,
  SEARCHED_ITEM_NUMBER,
  VIDEO_ITEMS_PER_PAGE,
  LATEST,
  VIDEO_QUERY_SELECT_COLUMNS,
  USER_QUERY_SELECT_COLUMNS,
} from '../common/constants';
import { TagVideoListQueryDto } from './dto/tag-video-list-query.dto';
import { Video } from '../../entity/video.entity';
import { Tag } from '../../entity/tag.entity';
import { TagListQueryDto } from './dto/tag-list-query.dto';
import { getOffset } from '../libs/get-offset';
import { QueryOptionWhere } from './interface/QueryOptionWhere';

@Injectable()
export class TagService {
  public constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  public async findTags(
    tagListQueryDto: TagListQueryDto,
  ): Promise<[Tag[], number]> {
    const { page, keyword } = tagListQueryDto;

    const skip = page ? getOffset(page, TAG_ITEMS_PER_PAGE) : 0;
    const take = keyword && !page ? SEARCHED_ITEM_NUMBER : TAG_ITEMS_PER_PAGE;
    const where: QueryOptionWhere = {
      status: 1,
    };

    if (keyword) {
      where.name = Like(`%${keyword}%`);
    }

    return await this.tagRepository.findAndCount({
      where,
      order: {
        videosCount: 'DESC',
        id: 'DESC',
      },
      skip,
      take,
    });
  }

  public async findTagById(id: number): Promise<Tag> {
    return await this.tagRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async findTagVideos(
    id: number,
    tagVideoListQueryDto: TagVideoListQueryDto,
  ): Promise<[Video[], number]> {
    const { page, sort } = tagVideoListQueryDto;
    const offset = getOffset(page, VIDEO_ITEMS_PER_PAGE);
    const orderBy = sort === LATEST ? 'video.createdAt' : 'video.popularity';

    const tagVideoList = await this.tagRepository
      .createQueryBuilder('Tag')
      .where({
        id,
      })
      .leftJoin('Tag.videos', 'Video')
      .orderBy(orderBy, 'DESC')
      .orderBy('Video.id', 'DESC')
      .offset(offset)
      .limit(VIDEO_ITEMS_PER_PAGE)
      .leftJoin('Video.user', 'User')
      .select(TAG_QUERY_SELECT_COLUMNS)
      .addSelect(VIDEO_QUERY_SELECT_COLUMNS)
      .addSelect(USER_QUERY_SELECT_COLUMNS)
      .getOne();

    if (!tagVideoList) {
      return [[], 0];
    }

    return [tagVideoList.videos, tagVideoList.videos.length];
  }
}
