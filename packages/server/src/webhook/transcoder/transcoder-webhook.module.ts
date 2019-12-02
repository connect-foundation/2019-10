import { Module } from '@nestjs/common';
import { TranscoderWebhookService } from './transcoder-webhook.service';
import { TranscoderWebhookController } from './transcoder-webhook.controller';
import { UploadedVideoTableModule } from 'src/uploaded-video-table/uploaded-video-table.module';
import { TypeOrmModule } from '@nestjs/typeorm';
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
