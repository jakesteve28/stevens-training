import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as compression from 'compression';
//import * as csurf from 'csurf';
//import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { open, FileHandle } from 'fs/promises';
import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
//import { createProxyMiddleware } from 'http-proxy-middleware';
import * as cluster from 'cluster';
import * as os from 'os';
import * as http from 'http';
import * as https from 'https';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

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
    return {};
  } finally {
    keyfh.close(); 
    certfh.close();
  }
}

export function runCluster(bootstrap: () => Promise<void>) {
  const numCores = os.cpus().length; 
  if(cluster.isMaster) {
    for(let i = 0; i < numCores; ++i) {
      cluster.fork(); 
    }
  } else {
    bootstrap(); 
  }
}

export async function bootstrap(): Promise<void> {
  console.log("Starting bootstrapping process");
  const nestOptions: NestApplicationOptions = {};
  const httpsOptions: https.ServerOptions = await getHttpsOptions();
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
  const server = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );
  //const app = await NestFactory.create(AppModule, nestOptions);
  const config = app.get(ConfigService);
  const cookieSecret = config.get<string>('SIGNED_COOKIE_SECRET');
  // app.use(helmet());
  app.enableCors();
  //app.use(compression());
  //app.use(csurf());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableShutdownHooks();
  app.use(cookieParser(cookieSecret)); 
  await app.init();
  http.createServer(server).listen(80);
  https.createServer(httpsOptions, server).listen(443);
}
if(process.env.NODE_ENV === 'production')
  runCluster(bootstrap);
else bootstrap();
