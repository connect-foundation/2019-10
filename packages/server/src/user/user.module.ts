import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { User } from '../../entity/user.entity';
import { Video } from '../../entity/video.entity';
import { UserSerializerModule } from '../serializer/user-serializer.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Video]), UserSerializerModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
