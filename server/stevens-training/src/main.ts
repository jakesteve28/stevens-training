import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as compression from 'compression';
//import * as csurf from 'csurf';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

function getHttpsOptions() {
  try {
    console.log("Checking for https key/cert in project_root/secrets/ directory"); 
    if(!fs.existsSync('secrets/private-key.pem')) {
      console.log("Cannot find private key. Not starting server.");
      return false;
    }
    if(!fs.existsSync('secrets/public-certificate.pem')) {
      console.log("Cannot find public certificate. Not starting server.");
      return false;
    }
    console.log("Found key/cert! Using for https");
    const httpsOptions = {
      key: fs.readFileSync('secrets/private-key.pem'),
      cert: fs.readFileSync('secrets/public-certificate.pem')
    };
    return httpsOptions;
  } catch(err) {
    return null;
  }
}

async function bootstrap() {
  console.log("Starting bootstrapping process");
  const nestOptions: NestApplicationOptions = {};
  const httpsOptions = getHttpsOptions();
  if(!httpsOptions) {
    console.log("Error: No https keys. Starting as http server.");
    if(process.env.NODE_ENV === 'development') {
      console.log('Development Mode Only: Starting server as http (NO HTTPS!)');
    } else {
      console.log("Production Mode Only: Cannot finish bootstrapping server. Shutting down. (NO HTTPS!)");
      process.exit(1);
    }
  } else {
    nestOptions.httpsOptions = httpsOptions ;
  }
  const app = await NestFactory.create(AppModule, nestOptions);
  const config = app.get(ConfigService);
  const cookieSecret = config.get<string>('SIGNED_COOKIE_SECRET');
  app.use(helmet());
  app.enableCors();
  app.use(compression());
  //app.use(csurf());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableShutdownHooks();
  app.use(cookieParser(cookieSecret)); 
  await app.listen(3000);
}
bootstrap();
