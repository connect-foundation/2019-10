import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { GithubApiModule } from 'src/third-party-api/github-api/github-api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../typeorm/src/entity/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserSerializerModule } from 'src/serializer/user-serializer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    GithubApiModule,
    UserSerializerModule,
    UserModule,
  ],
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
