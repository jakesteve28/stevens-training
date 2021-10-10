import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goal } from '../entities/goal.entity';
import { GoalController } from '../controllers/goals.controller';
import { GoalService } from '../providers/goal.service';
import { UserModule } from './user.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
    imports: [TypeOrmModule.forFeature([Goal]), UserModule],
    providers: [GoalService, {
        provide: APP_GUARD,
        useClass: ThrottlerGuard,
      },],
    controllers: [GoalController
    ],
    exports: []
})
export class GoalModule {}
    
