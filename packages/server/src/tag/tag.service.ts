import { Injectable } from '@nestjs/common';
import { Tag } from '../../../typeorm/src/entity/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { QueryStringDto } from '../common/pipes/query-string.pipe/requestDto';
import { ITEMS_PER_PAGE, SEARCHED_ITEM_NUMBER } from 'src/constants';

@Injectable()
export class TagService {
  public constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  public async findTags(queryStringDto: QueryStringDto): Promise<Tag[]> {
    const { page, keyword, limit } = queryStringDto;

    const qb = this.tagRepository
      .createQueryBuilder()
      .select(['Tag.id', 'Tag.name']);

    if (limit) {
      return await qb
        .where('Tag.name like :nameKeyword', {
          nameKeyword: '%' + keyword + '%',
        })
        .limit(SEARCHED_ITEM_NUMBER)
        .orderBy('videosCount', 'DESC')
        .addOrderBy('id', 'DESC')
        .getMany();
    }

    const offset = (page - 1) * ITEMS_PER_PAGE;

    return await qb
      .where(
        // tslint:disable-next-line:max-line-length
        'Tag.name like :nameKeyword',
        {
          nameKeyword: '%' + keyword + '%',
        },
      )
      .limit(ITEMS_PER_PAGE)
      .offset(offset)
      .orderBy('videosCount', 'DESC')
      .addOrderBy('id', 'DESC')
      .getMany();
  }
}
