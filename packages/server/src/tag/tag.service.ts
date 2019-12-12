import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { Tag } from '../../../typeorm/src/entity/tag.entity';
import { TagListQueryDto } from './dto/tag-list-query.dto';
import { getOffset } from '../libs/get-offset';
import { TAG_ITEMS_PER_PAGE, SEARCHED_ITEM_NUMBER } from '../common/constants';
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
}
