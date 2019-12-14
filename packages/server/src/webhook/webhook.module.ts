import { Module } from '@nestjs/common';

import { TranscoderWebhookModule } from './transcoder/transcoder-webhook.module';

@Module({
  imports: [TranscoderWebhookModule],
  exports: [TranscoderWebhookModule],
})
export class WebhookModule {}
