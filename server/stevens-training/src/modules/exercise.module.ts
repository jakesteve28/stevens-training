import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from '../entities/exercise.entity';
import { ExerciseController } from '../controllers/exercise.controller';
import { ExerciseService } from '../providers/exercise.service';

@Module({
    imports: [TypeOrmModule.forFeature([Exercise])],
    providers: [ExerciseService],
    controllers: [ExerciseController],
    exports: []
})
export class ExerciseModule {}
    
