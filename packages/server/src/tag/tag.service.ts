import { Injectable } from '@nestjs/common';
import { Tag } from '../../../typeorm/src/entity/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ITEMS_PER_PAGE, SEARCHED_ITEM_NUMBER } from 'src/constants';

@Injectable()
export class TagService {
  public constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  public async findTags({ page, keyword, limit }): Promise<Tag[]> {
    const qb = this.tagRepository
      .createQueryBuilder()
      .select(['Tag.id', 'Tag.name'])
      .where('Tag.name like :nameKeyword', {
        nameKeyword: '%' + keyword + '%',
      });

    if (limit) {
      return await this.uploadVideoCountQuery(qb.limit(SEARCHED_ITEM_NUMBER));
    }

    const offset = (page - 1) * ITEMS_PER_PAGE;

    return await this.uploadVideoCountQuery(
      qb.limit(ITEMS_PER_PAGE).offset(offset),
    );
  }

  private async uploadVideoCountQuery(qb): Promise<Tag[]> {
    return await qb
      .orderBy('videosCount', 'DESC')
      .addOrderBy('createdAt', 'DESC')
      .addOrderBy('id', 'DESC')
      .getMany();
  }
}
