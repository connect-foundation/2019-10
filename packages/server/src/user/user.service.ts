import { Injectable } from '@nestjs/common';
import { User } from '../../../typeorm/src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from '../../../typeorm/src/entity/video.entity';
import { UserRequestDto, UserResponseDto } from './dto';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  public async findUser(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne(id);
    return this.createUserResponse(user);
  }

  public async findVideos(id: number): Promise<Video[]> {
    return await this.videoRepository.find({
      where: {
        user: {
          id,
        },
      },
    });
  }

  public async insertUser(
    createUserDto: UserRequestDto,
  ): Promise<UserResponseDto> {
    const user = this.userRepository.create(createUserDto);
    const result = await this.userRepository.insert(user);
    return this.createUserResponse(user);
  }

  public async deleteUser(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne(id);
    const result = await this.userRepository.delete(user);
    return this.createUserResponse(user);
  }

  public async updateUser(
    updateUserDto: UserRequestDto,
  ): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: {
        githubId: updateUserDto.githubId,
      },
    });
    this.userRepository.merge(user, updateUserDto);
    const result = await this.userRepository.save(user);
    return this.createUserResponse(user);
  }

  private createUserResponse(user: User): UserResponseDto {
    return new UserResponseDto(
      user.id,
      user.username,
      user.description,
      user.avatar,
      user.email,
      user.githubId,
    );
  }
}
