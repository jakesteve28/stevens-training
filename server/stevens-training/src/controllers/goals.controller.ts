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


  @Get('/user')
  async getUserGoals(@Req() req, @Param('id') userId: string): Promise<Goal[]> {
    this.logger.log(`Get goals for user ${req.user.userName}`);
    return (await this.userService.findOne(req.user.id)).goals;
  }

  @Get(':id')
  async getGoal(@Param('id') goalId: string): Promise<Goal> {
    this.logger.log(`Get goal ${goalId}`);
    return this.goalService.findOne(goalId);
  }


  @Post('create')
  async addGoal(@Req() req, @Body() newGoal: GoalDto): Promise<Goal> {
    this.logger.log(`Create goal by user ${req.user.userName}`);
    return this.goalService.create(newGoal, req.user.id);
  }

  @Delete(':id')
  async deleteGoal(@Req() req, @Param('id') goalId: string): Promise<void> {
    this.logger.log(`Remove goal by user ${req.user.userName}`);
    return this.goalService.remove(goalId);
  }

}
