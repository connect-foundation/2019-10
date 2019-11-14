import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../typeorm/src/entity/user.entity';

@Injectable()
export class AppService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async getHello(): Promise<string> {
    // const user = this.userRepository.create({
    //   username: 'username',
    //   description: 'description',
    //   avatar: 'avatar',
    //   email: 'email',
    //   githubId: 'githubId',
    // });
    // await this.userRepository.save(user);

    const findUser = await this.userRepository.find({ email: 'email' });
    findUser[0].avatar = 'new Avartarrr';
    await this.userRepository.save(findUser[0]);

    return 'Hello World!';
  }
}
