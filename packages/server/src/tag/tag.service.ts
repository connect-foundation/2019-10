import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { Tag } from '../../../typeorm/src/entity/tag.entity';
import { TagListQueryDto } from 'tag/dto/tag-list-query.dto';
import { getOffset } from 'libs/get-offset';
import {
  TAG_ITEMS_PER_PAGE,
  TAG_QUERY_SELECT_COLUMNS,
  SEARCHED_ITEM_NUMBER,
} from 'common/constants';

@Injectable()
export class TagService {
  public constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  private async uploadVideoCountQuery(qb): Promise<[Tag[], number]> {
    console.log('a', qb);
    return await qb
      .orderBy('videosCount', 'DESC')
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
          id: 'DESC',
        },

        skip: offset,
        take: TAG_ITEMS_PER_PAGE,
      });
    }

    if (page) {
      return await this.tagRepository.findAndCount({
        where: { name: Like(`%${keyword}%`) },
        order: {
          videosCount: 'DESC',
          id: 'DESC',
        },
        skip: offset,
        take: TAG_ITEMS_PER_PAGE,
      });
    }

    return await this.tagRepository.findAndCount({
      where: { name: Like(`%${keyword}%`) },
      order: {
        videosCount: 'DESC',
        id: 'DESC',
      },
      take: SEARCHED_ITEM_NUMBER,
    });
  }
}
