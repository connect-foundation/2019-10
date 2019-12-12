import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Video } from '../../../entity/video.entity';
import { Tag } from '../../../entity/tag.entity';
import { User } from '../../../entity/user.entity';
import { UploadedVideoTableModule } from '../../uploaded-video-table/uploaded-video-table.module';
import { TranscoderWebhookService } from './transcoder-webhook.service';
import { TranscoderWebhookController } from './transcoder-webhook.controller';

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
