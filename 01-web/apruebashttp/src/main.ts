import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as session from 'express-session';
// tslint:disable-next-line:no-var-requires
const FileStore = require('session-file-store')(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;
  app.set('view engine', 'ejs');
  app.use(
    session({
      name: 'server-session-id',
      secret: 'Este es un secreto',
      resave: true,
      saveUninitialized: true,
      cookie:  {secure: false},
      store: new FileStore(),
    }),
  )
  await app.listen(3000);
}
bootstrap();
