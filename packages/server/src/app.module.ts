import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { UserSessionModule } from './user-session/user-session.module';
import { CommentModule } from './comment/comment.module';
import { WebhookModule } from './webhook/webhook.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { TagModule } from './tag/tag.module';
import { DeserializerMiddleware } from './common/middlewares/deserializer/deserializer.middleware';
import { AppController } from './app.controller';
import { Tag } from '../entity/tag.entity';

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
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(DeserializerMiddleware).forRoutes('*');
  }
}
