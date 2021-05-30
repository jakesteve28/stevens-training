import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from '../entities/workout.entity';
import { WorkoutController } from '../controllers/workout.controller';
import { WorkoutService } from '../providers/workout.service';

@Module({
    imports: [TypeOrmModule.forFeature([Workout])],
    providers: [WorkoutService],
    controllers: [WorkoutController],
    exports: []
})
export class WorkoutModule {}
    
