import { Injectable } from '@nestjs/common';
import { User } from '../../../typeorm/src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from '../../../typeorm/src/entity/video.entity';

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
}
