import { Module } from '@nestjs/common';
import { ExerciseController } from '../controllers/exercise.controller';
import { ExerciseService } from '../providers/exercise.service';

@Module({
    imports: [],
    providers: [ExerciseService],
    controllers: [ExerciseController],
    exports: []
})
export class ExerciseModule {}
    
