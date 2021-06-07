import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from '../entities/exercise.entity';
import { ExerciseController } from '../controllers/exercise.controller';
import { ExerciseService } from '../providers/exercise.service';
import { WorkoutService } from 'src/providers/workout.service';
import { WorkoutModule } from './workout.module';

@Module({
    imports: [TypeOrmModule.forFeature([Exercise]), forwardRef(() => WorkoutModule)],
    providers: [ExerciseService],
    controllers: [ExerciseController],
    exports: [ExerciseService]
})
export class ExerciseModule {}
    
