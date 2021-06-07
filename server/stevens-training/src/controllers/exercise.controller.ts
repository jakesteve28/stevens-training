/** 
    2021 Jacob Stevens   
*/

import { Controller, Post, Body, UseGuards, Req, Put, Get, Delete } from '@nestjs/common';
import { Exercise } from '../entities/exercise.entity';
import { ExerciseService } from '../providers/exercise.service';

@Controller('exercise')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  @Get(':id')
  async getExercise(): Promise<Exercise> {
      return null;
  }

  @Post('create')
  async createExercise(): Promise<Exercise> {
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

