import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminController } from '../controllers/admin.controller';
import { AdminService } from '../providers/admin.service';
import { ExerciseModule } from './exercise.module';
import { GoalModule } from './goal.module';
import { PlaceModule } from './place.module';
import { UserModule } from './user.module';
import { WorkoutModule } from './workout.module';


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
            ExerciseModule,
            GoalModule,
            PlaceModule, 
            UserModule, 
            WorkoutModule  
          ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AppModule {}
