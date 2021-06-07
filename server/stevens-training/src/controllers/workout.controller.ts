/** 
    2021 Jacob Stevens   
*/

import { Controller, Post, Body, UseGuards, Req, Put, Get, Delete } from '@nestjs/common';
import { Workout } from '../entities/workout.entity';
import { WorkoutService } from '../providers/workout.service';
import { ExerciseService } from '../providers/exercise.service';

@Controller('workout')
export class WorkoutController {
  constructor(private workoutService: WorkoutService, 
              private exerciseService: ExerciseService) {}

  @Get(':id')
  async getWorkout(): Promise<Workout> {
      return null;
  }

  @Post('create')
  async createWorkout(): Promise<Workout> {
    return null;
  }

  @Put('addexercise')
  async addExercise(): Promise<Workout> {
    return null;
  } 

  @Put('update')
  async updateWorkout(): Promise<Workout> {
    return null;
  }

  @Put('removeexercise')
  async removeExercise(): Promise<Workout> {
    return null;
  }

  @Delete(':id')
  async removeWorkout(): Promise<void> {

  }

  @Put('updateexercise')
  async updateExercise(): Promise<Workout> {
    return null;
  }
}

