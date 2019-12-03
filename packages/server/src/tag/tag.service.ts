import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tag } from '../../../typeorm/src/entity/tag.entity';
import { TagListQueryDto } from 'tag/dto/tag-list-query.dto';
import { getOffset } from 'libs/get-offset';
import {
  TAG_ITEMS_PER_PAGE,
  TAG_QUERY_SELECT_COLUMNS,
  SEARCHED_ITEM_NUMBER,
} from './constants';

@Injectable()
export class TagService {
  public constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  private async uploadVideoCountQuery(qb): Promise<[Tag[], number]> {
    return await qb
      .orderBy('videosCount', 'DESC')
      .addOrderBy('createdAt', 'DESC')
      .addOrderBy('id', 'DESC')
      .getManyAndCount();
  }

  public async findTags(
    tagListQueryDto: TagListQueryDto,
  ): Promise<[Tag[], number]> {
    const { page, keyword } = tagListQueryDto;
    const offset = getOffset(page, TAG_ITEMS_PER_PAGE);

    if (!keyword) {
      return await this.tagRepository.findAndCount({
        order: {
          videosCount: 'DESC',
        },

        skip: offset,
        take: TAG_ITEMS_PER_PAGE,
      });
    }

    const qb = this.tagRepository
      .createQueryBuilder()
      .select(TAG_QUERY_SELECT_COLUMNS)
      .where('Tag.name like :nameKeyword', {
        nameKeyword: '%' + keyword + '%',
      });

    if (page) {
      return await this.uploadVideoCountQuery(
        qb.limit(TAG_ITEMS_PER_PAGE).offset(offset),
      );
    }

    return await this.uploadVideoCountQuery(qb.limit(SEARCHED_ITEM_NUMBER));
  }
}
