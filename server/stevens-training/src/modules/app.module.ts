import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { ExerciseModule } from './exercise.module';
import { GoalModule } from './goal.module';
import { PlaceModule } from './place.module';
import { UserModule } from './user.module';
import { WorkoutModule } from './workout.module';
import { MediaUpload } from '../entities/media-upload.entity';
import { Exercise } from '../entities/exercise.entity';
import { Message } from '../entities/message.entity';
import { Place } from '../entities/place.entity';
import { Story } from '../entities/story.entity';
import { Workout } from '../entities/workout.entity';
import { User } from '../entities/user.entity';
import { Goal } from '../entities/goal.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UploadModule } from './upload.module';
import { TasksService } from '../providers/tasks.service';
import { SignOnModule } from './signon.module';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from '../controllers/health.controller';
import { MailModule } from './mail.module';
import { NotificationModule } from './notification.module';
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
@Module({
  imports: [
            ConfigModule.forRoot(config),
            ScheduleModule.forRoot(),
            ServeStaticModule.forRoot({
              rootPath: "static",
              exclude: ["socket*"]
            }),
            NotificationModule,
            TypeOrmModule.forRootAsync({
              imports: [ConfigModule],
              useFactory: async (configService: ConfigService) => ({              
                  type: 'mysql',
                  host: configService.get<string>('DATABASE_HOST') || 'localhost',
                  port: +configService.get<number>('DATABASE_PORT') || 3306,
                  username: configService.get<string>('DATABASE_USER') || 'stevensdev',
                  password: configService.get<string>('DATABASE_PASSWORD') || 'stevens.dev.21',
                  database: configService.get<string>('DATABASE'),
                  synchronize: true,
                  cache: true,
                  entities: [User, Workout, Story, Place, Message, MediaUpload, Goal, Exercise]              
              }),
              inject: [ConfigService]
            }),        
            ThrottlerModule.forRoot({
              ttl: 60,
              limit: 25,
            }),
            ExerciseModule,
            GoalModule,
            PlaceModule, 
            UserModule, 
            WorkoutModule,
            UploadModule,
            SignOnModule,
            TerminusModule,
            MailModule  
          ],
          controllers: [HealthController],
  providers: [{
                provide: APP_GUARD,
                useClass: ThrottlerGuard,
              },
              TasksService      
  ]
})
export class AppModule {
  constructor(private configService: ConfigService){
    console.info("Connecting to MySql Database with TypeORM");
    console.info(`Details:\r\nHost: ${this.configService.get<string>('DATABASE_HOST') || 'localhost'}\r\nPort: ${this.configService.get<number>('DATABASE_PORT') || 3306}\r\nUsername: ${this.configService.get<string>('DATABASE_USER') || 'failure to load'}\r\nDatabase: ${this.configService.get<string>('DATABASE') || 'failure to load'}`);
  }
}
