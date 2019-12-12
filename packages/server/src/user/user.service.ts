import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { UserSerializerService } from 'serializer/user-serializer.service';

import { ParsedGithubUserDetail } from 'user/model/parsed-github-user-detail';
import { SignUpFormDataDto } from 'user/dto/sign-up-user-form.dto';
import { SignUpUserData } from 'user/model/sign-up-form-data';

import { User } from '../../../typeorm/src/entity/user.entity';
import { UserListQueryDto } from 'user/dto/user-list-query.dto';
import { getOffset } from 'libs/get-offset';
import { USER_ITEMS_PER_PAGE, SEARCHED_ITEM_NUMBER } from 'common/constants';

@Injectable()
export class UserService {
  public constructor(
    private readonly userSerializerService: UserSerializerService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async findUsers(
    userListQueryDto: UserListQueryDto,
  ): Promise<[User[], number]> {
    const { page, keyword } = userListQueryDto;

    const skip = page ? getOffset(page, USER_ITEMS_PER_PAGE) : 0;
    const take = keyword && !page ? SEARCHED_ITEM_NUMBER : USER_ITEMS_PER_PAGE;

    return await this.userRepository.findAndCount({
      where: { username: Like(`%${keyword}%`), status: 1 },
      order: {
        videosCount: 'DESC',
        id: 'DESC',
      },
      skip,
      take,
    });
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
