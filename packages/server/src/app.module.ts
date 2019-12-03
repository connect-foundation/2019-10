import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagModule } from './tag/tag.module';
import { UserModule } from 'user/user.module';
import { VideoModule } from 'video/video.module';
import { CommentModule } from 'comment/comment.module';
import { WebhookModule } from 'webhook/webhook.module';
import { AuthenticationModule } from 'authentication/authentication.module';
import { DeserializerMiddleware } from 'common/middlewares/deserializer/deserializer.middleware';
import { UserSessionModule } from 'user-session/user-session.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    VideoModule,
    UserSessionModule,
    CommentModule,
    WebhookModule,
    AuthenticationModule,
    TagModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(DeserializerMiddleware).forRoutes('*');
  }
}
