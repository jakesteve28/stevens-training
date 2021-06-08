/** 
    2021 Jacob Stevens   
*/

import { Controller, Post, Body, UseGuards, Req, Put, Get, Delete } from '@nestjs/common';
import { ExerciseDto } from 'src/entities/dto/exercise.dto';
import JwtRefreshAuthGuard from 'src/guards/jwt-refresh.auth-guard';
import { Exercise } from '../entities/exercise.entity';
import { ExerciseService } from '../providers/exercise.service';

@Controller('exercise')
@UseGuards(new JwtRefreshAuthGuard())
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  @Get(':id')
  async getExercise(): Promise<Exercise> {
      return null;
  }

  @Post('create')
  async createExercise(@Body() newExercise: ExerciseDto): Promise<Exercise> {
    return null;
  }

  @Put('addmedia')
  async addMedia(): Promise<Exercise> {
    return null;
  } 

  @Put('removemedia/:id')
  async removeMedia(): Promise<Exercise> {
    return null;
  } 

  @Put('update')
  async updateExercise(): Promise<Exercise> {
    return null;
  }

  @Delete(':id')
  async removeExercise(): Promise<void> {
    return null;
  }

}

