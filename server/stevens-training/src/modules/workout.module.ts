import { Module } from '@nestjs/common';
import { WorkoutController } from '../controllers/workout.controller';
import { WorkoutService } from '../providers/workout.service';

@Module({
    imports: [],
    providers: [WorkoutService],
    controllers: [WorkoutController],
    exports: []
})
export class WorkoutModule {}
    
