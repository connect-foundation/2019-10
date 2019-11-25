import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [TypeOrmModule.forRoot(), WebhookModule, UserModule, VideoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
