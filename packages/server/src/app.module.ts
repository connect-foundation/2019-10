import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { WebhookModule } from './webhook/webhook.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthenticationModule,
    WebhookModule,
    UserModule,
    VideoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
