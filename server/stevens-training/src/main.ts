import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as compression from 'compression';
//import * as csurf from 'csurf';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { open, stat, readFile, FileHandle, access } from 'fs/promises';
import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function getHttpsOptions() {
  let keyfh: FileHandle = null, certfh: FileHandle = null;
  const keypath = 'secrets/private-key.pem', certpath = 'secrets/public-certificate.pem';
  try {
    keyfh = await open(keypath, 'r'); 
    certfh = await open(certpath, 'r'); 
    console.log("Checking for https key/cert in project_root/secrets/ directory"); 
    if(!keyfh) {
      console.log("Cannot find private key. Not starting server.");
      return false;
    }
    if(!certfh) {
      console.log("Cannot find public certificate. Not starting server.");
      return false;
    }
    console.log("Found key/cert! Using for https");
    const httpsOptions = {
      key: await keyfh.readFile(),
      cert: await certfh.readFile()
    };
    return httpsOptions;
  } catch(err) {
    return null;
  } finally {
    keyfh.close(); 
    certfh.close();
  }
}

export async function bootstrap() {
  console.log("Starting bootstrapping process");
  const nestOptions: NestApplicationOptions = {};
  const httpsOptions = await getHttpsOptions();
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
  return app;
}
bootstrap();
