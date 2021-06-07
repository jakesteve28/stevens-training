/** 
    2021 Jacob Stevens   
*/

import { Controller, Post, Body, UseGuards, Req, Put, Get, Delete } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Goal } from '../entities/goal.entity';
import { GoalService } from '../providers/goal.service';
import { UserService } from '../providers/user.service';

@Controller('goal')
export class GoalController {
  constructor(private goalService: GoalService,
                private userService: UserService
                ) {}

  @Get(':id')
  async getGoal(): Promise<Goal> {
      return null;
  }

  @Get('/user/:id')
  async getGoalById(): Promise<Goal[]> {
    return null;
  }

  @Post('add')
  async addGoal(@Req() req): Promise<Goal> {
     return null;
  }

  @Delete(':id')
  async deleteGoal(): Promise<Goal> {
    return null;
  }

  @Put('update/:id')
  async updateGoal(): Promise<Goal> {
    return null;
  }

  @Get('byplace')
  async getGoalsByPlace(): Promise<Goal[]> {
    return null;   
  }

  @Get('bytype')
  async getGoalsByType(): Promise<Goal[]> {
      return null;
  }

}
