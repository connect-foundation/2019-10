import { Controller } from '@nestjs/common';
import { AppService } from 'app.service';

@Controller()
export class AppController {
  public constructor(private readonly appService: AppService) {}
}
