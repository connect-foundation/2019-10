import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_ALLOWED_ORIGINS.split(','),
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.use(helmet());
  app.use(bodyParser.text());
  app.use(cookieParser());

  await app.listen(4000);
}
bootstrap();
