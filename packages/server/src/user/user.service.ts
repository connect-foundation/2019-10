import { Injectable } from '@nestjs/common';
import { User } from '../../../typeorm/src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from '../../../typeorm/src/entity/video.entity';
// import { UserRequestDto } from './dto';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  public async findUser(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    return user;
  }

  // public async findUser(id: number): Promise<User> {
  //   const user = await this.userRepository.findOne(id);
  //   return user;
  // }

  // public async findVideos(id: number): Promise<Video[]> {
  //   return await this.videoRepository.find({
  //     where: {
  //       user: {
  //         id,
  //       },
  //     },
  //   });
  // }

  //   public async insertUser(createUserDto: UserRequestDto): Promise<User> {
  //     const user = this.userRepository.create(createUserDto);
  //     const result = await this.userRepository.insert(user);
  //     return user;
  //   }

  //   public async updateUser(updateUserDto: UserRequestDto): Promise<User> {
  //     const user = await this.userRepository.findOne({
  //       where: {
  //         githubId: updateUserDto.githubId,
  //       },
  //     });
  //     this.userRepository.merge(user, updateUserDto);
  //     const result = await this.userRepository.save(user);
  //     return user;
  //   }
  // }
}
