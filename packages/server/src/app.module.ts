import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, VideoModule],
})
export class AppModule {}
