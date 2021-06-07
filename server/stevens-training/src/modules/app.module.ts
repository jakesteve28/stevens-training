import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { AdminController } from '../controllers/admin.controller';
import { AdminService } from '../providers/admin.service';
import { ExerciseModule } from './exercise.module';
import { GoalModule } from './goal.module';
import { PlaceModule } from './place.module';
import { UserModule } from './user.module';
import { WorkoutModule } from './workout.module';
import { MediaUpload } from '../entities/media-upload.entity';
import { Gallery } from '../entities/gallery.entity';
import { Exercise } from '../entities/exercise.entity';
import { Message } from '../entities/message.entity';
import { Place } from '../entities/place.entity';
import { Story } from '../entities/story.entity';
import { Workout } from '../entities/workout.entity';
import { User } from '../entities/user.entity';
import { Goal } from '../entities/goal.entity';
/**
 * Config module can be accessed globally, 
 * process.env is all cached, 
 * expand variables in .env files is allowed (handlebar {ENV_VAR} syntax)
 * if in prod, uses .prod.env, else uses .dev.env
 */
const config = {
  isGlobal: true,
  cache: true,
  expandVariables: true,
  envFilePath: (process.env.NODE_ENV === 'production') ? '.prod.env' : '.dev.env'
}
console.info("Connecting to MySql Database with TypeORM");
console.info(`Details: \r\nHost: ${process.env.DATABASE_HOST || 'localhost'} \r\nPort: ${process.env.DATABASE_PORT || 3306} \r\nUsername: ${process.env.DATABASE_USER || 'test'} \r\nDatabase: ${process.env.DATABASE || 'test'} \r\n`);
@Module({
  imports: [
            TypeOrmModule.forRoot({
              type: 'mysql',
              host: process.env.DATABASE_HOST || 'localhost',
              port: +process.env.DATABASE_PORT || 3306,
              username: process.env.DATABASE_USER || 'stevensdev',
              password: process.env.DATABASE_PASSWORD || 'stevens.dev.21',
              database: process.env.DATABASE || 'stevens-training-dev',
              synchronize: true,
              entities: [User, Workout, Story, Place, Message, MediaUpload, Goal, Gallery, Exercise]
            }),        
            ConfigModule.forRoot(config),
            ThrottlerModule.forRoot({
              ttl: 60,
              limit: 10,
            }),
            ExerciseModule,
            GoalModule,
            PlaceModule, 
            UserModule, 
            WorkoutModule  
          ],
  controllers: [AdminController],
  providers: [AdminService,
              {
                provide: APP_GUARD,
                useClass: ThrottlerGuard,
              }
  ],
})
export class AppModule {}
