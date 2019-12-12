import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../entity/user.entity';
import { UserSerializerService } from '../serializer/user-serializer.service';
import { UserListQueryDto } from './dto/user-list-query.dto';
import { getOffset } from '../libs/get-offset';
import {
  USER_ITEMS_PER_PAGE,
  USER_QUERY_SELECT_COLUMNS,
  USER_SEARCH_QUERY,
  SEARCHED_ITEM_NUMBER,
} from '../common/constants';
import { ParsedGithubUserDetail } from './model/parsed-github-user-detail';
import { SignUpFormDataDto } from './dto/sign-up-user-form.dto';
import { SignUpUserData } from './model/sign-up-form-data';

@Injectable()
export class UserService {
  public constructor(
    private readonly userSerializerService: UserSerializerService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
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
}
