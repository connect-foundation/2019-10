import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoModule } from './video/video.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [TypeOrmModule.forRoot(), VideoModule, WebhookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
