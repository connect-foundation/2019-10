import { Injectable } from '@nestjs/common';
import { User } from '../../../typeorm/src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Video } from '../../../typeorm/src/entity/video.entity';
import { QueryStringDto } from '../common/pipes/query-string.pipe/requestDto';
import { ITEMS_PER_PAGE, SEARCHED_ITEM_NUMBER } from 'src/constants';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  public async findUser(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async findVideos(userId: number): Promise<Video[]> {
    return await this.videoRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  public async findUsers(queryStringDto: QueryStringDto): Promise<User[]> {
    const { page, keyword, limit } = queryStringDto;

    const qb = this.userRepository
      .createQueryBuilder()
      .select(['User.id', 'User.username', 'User.avatar']);

    if (limit) {
      return await qb
        .where(
          '(User.username like :usernameKeyword) or (User.description like :descriptionKeyword)',
          {
            usernameKeyword: '%' + keyword + '%',
            descriptionKeyword: '%' + keyword + '%',
          },
        )
        .limit(SEARCHED_ITEM_NUMBER)
        .orderBy('videosCount', 'DESC')
        .addOrderBy('createdAt', 'DESC')
        .addOrderBy('id', 'DESC')
        .getMany();
    }

    const offset = (page - 1) * ITEMS_PER_PAGE;

    return await qb
      .where(
        // tslint:disable-next-line:max-line-length
        '(User.username like :usernameKeyword) or (User.description like :descriptionKeyword)',
        {
          usernameKeyword: '%' + keyword + '%',
          descriptionKeyword: '%' + keyword + '%',
        },
      )
      .limit(ITEMS_PER_PAGE)
      .offset(offset)
      .orderBy('videosCount', 'DESC')
      .addOrderBy('createdAt', 'DESC')
      .addOrderBy('id', 'DESC')
      .getMany();
  }
}
