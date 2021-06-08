import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as compression from 'compression';
import * as csurf from 'csurf';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  app.use(compression());
  app.use(csurf());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = app.get(ConfigService);
  const cookieSecret = config.get<string>('SIGNED_COOKIE_SECRET');
  app.use(cookieParser(cookieSecret)); 
  await app.listen(3000);
}
bootstrap();
