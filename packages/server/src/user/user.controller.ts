import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Body,
  Put,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Video } from '../../../typeorm/src/entity/video.entity';
import { UserRequestDto, UserResponseDto, UserIdParamDto } from './dto';
import { IdParamPipe } from '../common/pipes';
import { ValidateUserPipe } from './pipes';

@Controller('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}
  @Get('/:id')
  @UsePipes(IdParamPipe)
  public async getUser(
    @Param() { id }: UserIdParamDto,
  ): Promise<UserResponseDto> {
    return await this.userService.findUser(id);
  }

  @Get('/:id/videos')
  @UsePipes(IdParamPipe)
  public async getVideos(@Param() { id }: UserIdParamDto): Promise<Video[]> {
    return await this.userService.findVideos(id);
  }

  @Post('/')
  @UsePipes(ValidateUserPipe)
  public async createUser(
    @Body() createUserDto: UserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.insertUser(createUserDto);
  }

  @Delete('/:id')
  @UsePipes(IdParamPipe)
  public async deleteUser(
    @Param() { id }: UserIdParamDto,
  ): Promise<UserResponseDto> {
    return await this.userService.deleteUser(id);
  }

  @Put('/')
  @UsePipes(ValidateUserPipe)
  public async updateUser(
    @Body() userDto: UserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.updateUser(userDto);
  }
}
