import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSerializerService } from 'serializer/user-serializer.service';
import { User } from '../../../typeorm/src/entity/user.entity';
import { Video } from '../../../typeorm/src/entity/video.entity';
import { UserListQueryDto } from 'user/dto/user-list-query.dto';
import { getOffset } from 'libs/get-offset';
import {
  USER_ITEMS_PER_PAGE,
  USER_QUERY_SELECT_COLUMNS,
  USER_SEARCH_QUERY,
  SEARCHED_ITEM_NUMBER,
  USER_VIDEO_ITEMS_PER_PAGE,
  VIDEO_QUERY_SELECT_COLUMNS,
  LATEST,
  POPULAR,
} from 'common/constants';
import { ParsedGithubUserDetail } from 'user/model/parsed-github-user-detail';
import { SignUpFormDataDto } from 'user/dto/sign-up-user-form.dto';
import { SignUpUserData } from 'user/model/sign-up-form-data';

@Injectable()
export class UserService {
  public constructor(
    private readonly userSerializerService: UserSerializerService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  private async uploadVideoCountQuery(qb): Promise<[User[], number]> {
    return await qb
      .orderBy('videosCount', 'DESC')
      .addOrderBy('createdAt', 'DESC')
      .addOrderBy('id', 'DESC')
      .getManyAndCount();
  }

  public async findUsers(
    userListQueryDto: UserListQueryDto,
  ): Promise<[User[], number]> {
    const { page, keyword } = userListQueryDto;

    const offset = getOffset(page, USER_ITEMS_PER_PAGE);

    const qb = this.userRepository
      .createQueryBuilder()
      .select(USER_QUERY_SELECT_COLUMNS)
      .where(USER_SEARCH_QUERY, {
        usernameKeyword: '%' + keyword + '%',
        descriptionKeyword: '%' + keyword + '%',
      });

    if (page) {
      return await this.uploadVideoCountQuery(
        qb.limit(USER_ITEMS_PER_PAGE).offset(offset),
      );
    }

    return await this.uploadVideoCountQuery(qb.limit(SEARCHED_ITEM_NUMBER));
  }

  public async registerUser(
    parsedGithubUserDetail: ParsedGithubUserDetail,
    signUpFormDataDto: SignUpFormDataDto,
  ): Promise<User> {
    const formData = new SignUpUserData(
      parsedGithubUserDetail,
      signUpFormDataDto,
    );

    const user = this.userRepository.create(formData);
    await this.userRepository.save(user);

    return user;
  }

  public instructToSerialize(userEntity: User): string {
    const tokenId = this.userSerializerService.serializeUser(userEntity);

    return tokenId;
  }

  public async findUser(id): Promise<User> {
    return this.userRepository
      .createQueryBuilder()
      .where({
        id,
      })
      .getOne();
  }

  public async findVideosByUser({
    id,
    page,
    sort,
  }): Promise<[Video[], number]> {
    const offset = getOffset(page, USER_VIDEO_ITEMS_PER_PAGE);

    const qb = this.videoRepository
      .createQueryBuilder()
      .where({
        user: {
          id,
        },
      })
      .select(VIDEO_QUERY_SELECT_COLUMNS)
      .limit(USER_VIDEO_ITEMS_PER_PAGE)
      .offset(offset);

    if (sort === LATEST) {
      return qb.orderBy('Video_createdAt', 'DESC').getManyAndCount();
    }

    if (sort === POPULAR) {
      return qb.orderBy('Video_popularity', 'DESC').getManyAndCount();
    }
  }
}
