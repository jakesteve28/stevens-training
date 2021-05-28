import { Module } from '@nestjs/common';
import { GoalController } from '../controllers/goals.controller';
import { GoalService } from '../providers/goal.service';

@Module({
    imports: [],
    providers: [GoalService],
    controllers: [GoalController],
    exports: []
})
export class GoalModule {}
    
