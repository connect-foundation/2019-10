import { Context } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as serverless from 'aws-serverless-express';
import * as express from 'express';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

let cachedServer: Server;

async function bootstrapServer(): Promise<Server> {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  return NestFactory.create(AppModule, adapter)
    .then(app => {
      app.enableCors({
        origin: process.env.CORS_ALLOWED_ORIGINS.split(','),
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 204,
      });
      app.use(helmet());
      app.use(bodyParser.text());
      app.use(cookieParser());
      return app;
    })
    .then(app => app.init())
    .then(() => serverless.createServer(expressApp));
}

// tslint:disable-next-line: no-any
export const handler = (event: any, context: Context) => {
  if (!cachedServer) {
    bootstrapServer().then(server => {
      cachedServer = server;
      return serverless.proxy(server, event, context);
    });
  } else {
    return serverless.proxy(cachedServer, event, context);
  }
};
