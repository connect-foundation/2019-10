import { Injectable } from '@nestjs/common';
import { User } from '../../../typeorm/src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from '../../../typeorm/src/entity/video.entity';
import { UserDto, UserResponseDto } from './dto';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  private createUserResponse(user: User): UserResponseDto {
    const UserResponse: UserResponseDto = {
      id: user.id,
      username: user.username,
      description: user.description,
      avatar: user.avatar,
      email: user.email,
      githubId: user.githubId,
    };
    return UserResponse;
  }

  public async findUser(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne(id);
    return this.createUserResponse(user);
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

  public async insertUser(createUserDto: UserDto): Promise<UserResponseDto> {
    const user = this.userRepository.create(createUserDto);
    const result = await this.userRepository.insert(user);
    return this.createUserResponse(user);
  }

  public async deleteUser(id): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne(id);
    const result = await this.userRepository.delete(user);
    return this.createUserResponse(user);
  }

  public async putUser(id, putUserDto: UserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne(id);
    this.userRepository.merge(user, putUserDto);
    const result = await this.userRepository.save(user);
    return this.createUserResponse(user);
  }
}
