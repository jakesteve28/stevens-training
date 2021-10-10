import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from '../entities/workout.entity';
import { WorkoutController } from '../controllers/workout.controller';
import { WorkoutService } from '../providers/workout.service';
import { ExerciseModule } from './exercise.module';
import { UserModule } from './user.module';
import { PlaceModule } from './place.module';

@Module({
    imports: [TypeOrmModule.forFeature([Workout]),
              forwardRef(() => ExerciseModule),
              forwardRef(() => UserModule)
            ],
    providers: [WorkoutService],
    controllers: [WorkoutController],
    exports: [WorkoutService]
})
export class WorkoutModule {}
    
