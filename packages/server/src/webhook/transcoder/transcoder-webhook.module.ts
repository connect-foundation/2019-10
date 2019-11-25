import { Module } from '@nestjs/common';
import { TranscoderWebhookService } from './transcoder-webhook.service';
import { TranscoderWebhookController } from './transcoder-webhook.controller';

@Module({
  providers: [TranscoderWebhookService],
  controllers: [TranscoderWebhookController],
  exports: [TranscoderWebhookService],
})
export class TranscoderWebhookModule {}
