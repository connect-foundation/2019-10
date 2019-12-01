import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../typeorm/src/entity/user.entity';
import { Repository } from 'typeorm';
import { SignUpFormDataDto } from './dto/sign-up-user-form.dto';
import { SignUpUserData } from './model/sign-up-form-data';
import { ParsedGithubUserDetail } from './model/parsed-github-user-detail';
import { UserSerializerService } from 'src/serializer/user-serializer.service';

@Injectable()
export class UserService {
  public constructor(
    private readonly userSerializerService: UserSerializerService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

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
