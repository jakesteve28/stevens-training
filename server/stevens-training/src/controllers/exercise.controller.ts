/** 
    2021 Jacob Stevens   
*/

import { Controller, Post, Body, UseGuards, Req, Put, Get, Delete, Logger, Param } from '@nestjs/common';
import { ExerciseDto } from '../entities/dto/exercise.dto';
import JwtRefreshAuthGuard from '../guards/jwt-refresh.auth-guard';
import { Exercise } from '../entities/exercise.entity';
import { ExerciseService } from '../providers/exercise.service';

@Controller('exercise')
@UseGuards(new JwtRefreshAuthGuard())
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  private readonly logger = new Logger(ExerciseController.name);

  @Get(':id')
  async getExercise(@Req() req, @Param('id') exerciseId: string): Promise<Exercise> {
      this.logger.log(`Get exercise ${exerciseId} by user ${req.user.userName}`);
      return this.exerciseService.findOne(exerciseId);
  }

  @Post('create')
  async createExercise(@Req() req, @Body() newExercise: ExerciseDto): Promise<Exercise> {
    this.logger.log(`Create exercise called by user ${req.user.userName}`);
    return this.exerciseService.create(newExercise);
  }

  @Delete(':id')
  async removeExercise(@Req() req, @Param('id') exerciseId: string): Promise<void> {
    this.logger.log(`Remove exercise called by user ${req.user.userName}`);
    return this.exerciseService.delete(exerciseId);
  }
}

