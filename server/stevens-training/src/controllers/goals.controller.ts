/** 
    2021 Jacob Stevens   
*/

import { Controller, Post, Body, UseGuards, Req, Put, Get, Delete, Logger, Param } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Goal } from '../entities/goal.entity';
import { GoalService } from '../providers/goal.service';
import { UserService } from '../providers/user.service';
import JwtRefreshAuthGuard from '../guards/jwt-refresh.auth-guard';
import { GoalDto } from '../entities/dto/goal.dto';

@Controller('goal')
@UseGuards(new JwtRefreshAuthGuard())
export class GoalController {
  constructor(private goalService: GoalService,
                private userService: UserService
                ) {}

  private readonly logger = new Logger(GoalController.name);

  @Get(':id')
  async getGoal(@Param('id') goalId: string): Promise<Goal> {
    return this.goalService.findOne(goalId);
  }

  @Get('/user/:id')
  async getUserGoals(@Param('id') userId: string): Promise<Goal[]> {
    return (await this.userService.findOne(userId)).goals;
  }

  @Post('add')
  async addGoal(@Req() req, @Body() newGoal: GoalDto): Promise<Goal> {
     return this.goalService.create(newGoal, req.user.id);
  }

  @Delete(':id')
  async deleteGoal(@Param('id') goalId: string): Promise<void> {
    return this.goalService.remove(goalId);
  }

}
