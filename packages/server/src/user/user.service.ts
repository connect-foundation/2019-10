import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../typeorm/src/entity/user.entity';
import { Repository } from 'typeorm';
import { SignUpFormDataDto } from './dto/sign-up-user-form.dto';
import { SignUpUserData } from './model/sign-up-form-data';
import { ParsedGithubUserDetail } from './model/parsed-github-user-detail';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async registerUser(
    parsedGithubUserDetail: ParsedGithubUserDetail,
    signUpFormDataDto: SignUpFormDataDto,
  ) {
    const formData = new SignUpUserData(
      parsedGithubUserDetail,
      signUpFormDataDto,
    );

    const user = this.userRepository.create(formData);
    await this.userRepository.save(user);
  }
}
