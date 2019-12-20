import { Controller, Post, Body } from '@nestjs/common';

import { TranscoderNotificationDto } from './dto/elastic-transcoder/transcoder-notification.dto';
import { TranscoderWebhookService } from './transcoder-webhook.service';

@Controller('webhook/transcoder')
export class TranscoderWebhookController {
  public constructor(
    private readonly transcoderWebhookService: TranscoderWebhookService,
  ) {}

  @Post('/')
  public async listenTranscoderNotification(
    @Body() transcoderNotificationDto: TranscoderNotificationDto,
  ) {
    await this.transcoderWebhookService.synchronizeVideoInfo(
      transcoderNotificationDto,
    );

    return true;
  }
}
