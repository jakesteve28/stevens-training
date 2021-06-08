import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as compression from 'compression';
import * as csurf from 'csurf';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function getHttpsOptions() {
  try {
    console.log("Checking for https key/cert in project_root/secrets/ directory"); 
    if(!fs.existsSync('../secrets/private-key.pem')) {
      console.log("Cannot find private key. Not starting server.");
      return false;
    }
    if(!fs.existsSync('../secrets/public-certificate.pem')) {
      console.log("Cannot find public certificate. Not starting server.");
      return false;
    }
    const options = {
      key: fs.readFileSync('../secrets/private-key.pem'),
      cert: fs.readFileSync('../secrets/public-certificate.pem')
    };
    return options;
  } catch(err) {

  }
}

async function bootstrap() {
  console.log("Starting bootstrapping process");
  const options = await getHttpsOptions();
  const app = await NestFactory.create(AppModule, { httpsOptions: options });
  const config = app.get(ConfigService);
  const cookieSecret = config.get<string>('SIGNED_COOKIE_SECRET');
  app.use(helmet());
  app.enableCors();
  app.use(compression());
  app.use(csurf());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableShutdownHooks();
  app.use(cookieParser(cookieSecret)); 
  await app.listen(3000);
}
bootstrap();
