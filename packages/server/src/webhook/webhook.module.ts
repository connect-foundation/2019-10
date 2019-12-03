import { Module } from '@nestjs/common';
import { TranscoderWebhookModule } from 'webhook/transcoder/transcoder-webhook.module';

@Module({
  imports: [TranscoderWebhookModule],
  exports: [TranscoderWebhookModule],
})
export class WebhookModule {}
