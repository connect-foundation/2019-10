import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../../../typeorm/src/entity/tag.entity';
import { TAGS_PER_PAGE } from './constants';

@Injectable()
export class TagService {
  public constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  public async findHotTags(page: number): Promise<Tag[]> {
    const offset = (page - 1) * TAGS_PER_PAGE;

    return await this.tagRepository.find({
      order: {
        videosCount: 'DESC',
      },
      skip: offset,
      take: TAGS_PER_PAGE,
    });
  }
}
