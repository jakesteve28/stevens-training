import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goal } from '../entities/goal.entity';
import { GoalController } from '../controllers/goals.controller';
import { GoalService } from '../providers/goal.service';

@Module({
    imports: [TypeOrmModule.forFeature([Goal])],
    providers: [GoalService],
    controllers: [GoalController],
    exports: []
})
export class GoalModule {}
    
