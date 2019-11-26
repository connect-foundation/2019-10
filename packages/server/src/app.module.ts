import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { CommentModule } from './comment/comment.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    WebhookModule,
    UserModule,
    VideoModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
