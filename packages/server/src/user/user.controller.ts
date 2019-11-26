import {
  Controller,
  Get,
  Param,
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IdParserPipe } from 'src/common/pipes';
import { UserDetailDto } from './dto';

@Controller('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Get('/:id')
  @UsePipes(IdParserPipe)
  public async getUserDetail(@Param('id') userId: number) {
    const user = await this.userService.findUser(userId);

    if (!user) {
      throw new BadRequestException('Invalid access');
    }

    return new UserDetailDto(user);
  }

  // @Get('/:id')
  // @UsePipes(IdParamPipe)
  // public async getUser(
  //   @Param() { id }: UserIdParamDto,
  // ): Promise<UserResponseDto> {
  //   const user = await this.userService.findUser(id);
  //   return new UserResponseDto(user);
  // }

  // @Get('/:id/videos')
  // @UsePipes(IdParamPipe)
  // public async findUserVideos(
  //   @Param() { id }: UserIdParamDto,
  // ): Promise<Video[]> {
  //   return await this.userService.findVideos(id);
  // }

  // @Post('/')
  // @UsePipes(ValidateUserPipe)
  // public async createUser(
  //   @Body() createUserDto: UserRequestDto,
  // ): Promise<UserResponseDto> {
  //   const user = await this.userService.insertUser(createUserDto);
  //   return new UserResponseDto(user);
  // }

  // @Delete('/:id')
  // @UsePipes(IdParamPipe)
  // public async deleteUser(
  //   @Param() { id }: UserIdParamDto,
  // ): Promise<UserResponseDto> {
  //   const user = await this.userService.deleteUser(id);
  //   return new UserResponseDto(user);
  // }

  // @Put('/')
  // @UsePipes(ValidateUserPipe)
  // public async updateUser(
  //   @Body() userDto: UserRequestDto,
  // ): Promise<UserResponseDto> {
  //   const user = await this.userService.updateUser(userDto);
  //   return new UserResponseDto(user);
  // }
}
