import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../../../typeorm/src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from '../../../typeorm/src/entity/video.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Video])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
