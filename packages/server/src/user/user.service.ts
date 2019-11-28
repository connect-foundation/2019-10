import { Injectable } from '@nestjs/common';
import { User } from '../../../typeorm/src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Video } from '../../../typeorm/src/entity/video.entity';
import { UsersQueryDto } from './dto';
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

  // public async findUsers(usersQueryDto: UsersQueryDto): Promise<User[]> {
  //   const { page, keyword, limit } = usersQueryDto;

  //   const qb = this.userRepository
  //     .createQueryBuilder()
  //     .select(['User.id', 'User.username', 'User.avatar']);

  //   const offset = (page - 1) * ITEMS_PER_PAGE;

  //   // if (limit) {
  //   //   return await qb
  //   //   .where(
  //   //       '(User.username like :usernameKeyword) or (User.description like: descriptionKeyword',
  //   //       {
  //   //         usernameKeyword: '%' + keyword + '%',
  //   //         descriptionKeyword: '%' + keyword + '%',
  //   //       },
  //   //     )
  //   //     .limit(SEARCHED_ITEM_NUMBER)
  //   //     .orderBy('videoCount', 'DESC')
  //   //     .addOrderBy('createdAt', 'DESC')
  //   //     .addOrderBy('id', 'DESC');
  //   // }
  //   // return await qb
  //   //   .where(
  //   //     'username like :'
  //   //   )
  // }
}
