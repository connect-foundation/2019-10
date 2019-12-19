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
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
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
    const orderBy = sort === LATEST ? 'Video.createdAt' : 'Video.popularity';

    const videos = await this.videoRepository
      .createQueryBuilder('Video')
      .leftJoin('Video.tags', 'Tag')
      .leftJoinAndSelect('Video.user', 'User')
      .where('Video.status = :status', { status: 1 })
      .andWhere('Tag.id = :tagId', { tagId: id })
      .select(VIDEO_QUERY_SELECT_COLUMNS)
      .addSelect(USER_QUERY_SELECT_COLUMNS)
      .orderBy(orderBy, 'DESC')
      .skip(offset)
      .take(VIDEO_ITEMS_PER_PAGE)
      .getManyAndCount();

    return videos;
  }
}
