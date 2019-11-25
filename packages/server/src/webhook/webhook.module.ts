import { Module } from '@nestjs/common';

// tslint:disable-next-line: max-line-length
import { TranscoderWebhookModule } from './transcoder/transcoder-webhook.module';

@Module({
  imports: [TranscoderWebhookModule],
  exports: [TranscoderWebhookModule],
})
export class WebhookModule {}
