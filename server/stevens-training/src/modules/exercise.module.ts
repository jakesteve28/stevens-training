import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from '../entities/exercise.entity';
import { ExerciseController } from '../controllers/exercise.controller';
import { ExerciseService } from '../providers/exercise.service';
import { WorkoutModule } from './workout.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
    imports: [TypeOrmModule.forFeature([Exercise]), forwardRef(() => WorkoutModule)],
    providers: [ExerciseService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        },
    ],
    controllers: [ExerciseController],
    exports: [ExerciseService]
})
export class ExerciseModule {}
    
