import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadedVideoTableModule } from 'uploaded-video-table/uploaded-video-table.module';

import { TranscoderWebhookService } from 'webhook/transcoder/transcoder-webhook.service';
import { TranscoderWebhookController } from 'webhook/transcoder/transcoder-webhook.controller';

import { Video } from '../../../../typeorm/src/entity/video.entity';
import { Tag } from '../../../../typeorm/src/entity/tag.entity';
import { User } from '../../../../typeorm/src/entity/user.entity';

@Module({
  imports: [
    UploadedVideoTableModule,
    TypeOrmModule.forFeature([Video, Tag, User]),
  ],
  providers: [TranscoderWebhookService],
  controllers: [TranscoderWebhookController],
  exports: [TranscoderWebhookService],
})
export class TranscoderWebhookModule {}
