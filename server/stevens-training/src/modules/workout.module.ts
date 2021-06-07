import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from '../entities/workout.entity';
import { WorkoutController } from '../controllers/workout.controller';
import { WorkoutService } from '../providers/workout.service';
import { ExerciseModule } from './exercise.module';

@Module({
    imports: [TypeOrmModule.forFeature([Workout]),
              forwardRef(() => ExerciseModule)],
    providers: [WorkoutService],
    controllers: [WorkoutController],
    exports: [WorkoutService]
})
export class WorkoutModule {}
    
