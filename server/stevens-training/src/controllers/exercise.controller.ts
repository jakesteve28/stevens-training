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
  async getExercise(@Param('id') exerciseId: string): Promise<Exercise> {
      return this.exerciseService.findOne(exerciseId);
  }

  @Post('create')
  async createExercise(@Body() newExercise: ExerciseDto): Promise<Exercise> {
    return this.exerciseService.create(newExercise);;
  }

  @Delete(':id')
  async removeExercise(@Param('id') exerciseId: string): Promise<void> {
    return this.exerciseService.delete(exerciseId);
  }
  
}

