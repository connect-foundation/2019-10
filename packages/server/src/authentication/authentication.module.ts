import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GithubApiModule } from 'third-party-api/github-api/github-api.module';
import { UserModule } from 'user/user.module';
import { UserSerializerModule } from 'serializer/user-serializer.module';

import { AuthenticationService } from 'authentication/authentication.service';
import { AuthenticationController } from 'authentication/authentication.controller';

import { User } from '../../../typeorm/src/entity/user.entity';

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
