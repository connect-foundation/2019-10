import { Module } from '@nestjs/common';
import { TranscoderWebhookService } from './transcoder-webhook.service';
import { TranscoderWebhookController } from './transcoder-webhook.controller';
import { UploadedVideoTableModule } from 'src/uploaded-video/uploaded-video-table.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from '../../../../typeorm/src/entity/video.entity';
import { Tag } from '../../../../typeorm/src/entity/tag.entity';

@Module({
  imports: [UploadedVideoTableModule, TypeOrmModule.forFeature([Video, Tag])],
  providers: [TranscoderWebhookService],
  controllers: [TranscoderWebhookController],
  exports: [TranscoderWebhookService],
})
export class TranscoderWebhookModule {}
