import { Injectable } from '@nestjs/common';
import { Tag } from '../../../typeorm/src/entity/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  ITEMS_PER_PAGE,
  TAGS_PER_PAGE,
  SEARCHED_ITEM_NUMBER,
} from 'src/constants';

@Injectable()
export class TagService {
  public constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  public async findTags({ page, keyword }): Promise<[Tag[], number]> {
    const offset = (page - 1) * ITEMS_PER_PAGE;

    if (!keyword) {
      return await this.tagRepository.findAndCount({
        order: {
          videosCount: 'DESC',
        },

        skip: offset,
        take: TAGS_PER_PAGE,
      });
    }

    const qb = this.tagRepository
      .createQueryBuilder()
      .select(['Tag.id', 'Tag.name'])
      .where('Tag.name like :nameKeyword', {
        nameKeyword: '%' + keyword + '%',
      });

    if (page) {
      return await this.uploadVideoCountQuery(
        qb.limit(ITEMS_PER_PAGE).offset(offset),
      );
    }

    return await this.uploadVideoCountQuery(qb.limit(SEARCHED_ITEM_NUMBER));
  }

  private async uploadVideoCountQuery(qb): Promise<[Tag[], number]> {
    return await qb
      .orderBy('videosCount', 'DESC')
      .addOrderBy('createdAt', 'DESC')
      .addOrderBy('id', 'DESC')
      .getManyAndCount();
  }
}
