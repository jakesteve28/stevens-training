/** 
    2021 Jacob Stevens   
*/

import { Controller, Post, Body, UseGuards, Req, Put, Get, Delete, Logger, Param, Query } from '@nestjs/common';
import { Workout } from '../entities/workout.entity';
import { WorkoutService } from '../providers/workout.service';
import { ExerciseService } from '../providers/exercise.service';
import JwtRefreshAuthGuard from '../guards/jwt-refresh.auth-guard';
import { WorkoutDto } from '../entities/dto/workout.dto';

@Controller('workout')
@UseGuards(new JwtRefreshAuthGuard())
export class WorkoutController {
  constructor(private workoutService: WorkoutService, 
              private exerciseService: ExerciseService) {}

  private readonly logger = new Logger(WorkoutController.name);
          
  @Get(':id')
  async getWorkout(@Param('id') workoutId: string): Promise<Workout> {
      return this.workoutService.findOne(workoutId);
  }

  @Post('create')
  async createWorkout(@Req() req, @Body() createWorkoutDto: WorkoutDto): Promise<Workout> {
    return this.workoutService.create(req.user.id, createWorkoutDto);
  }

  @Put('addexercise/:id/:exerciseId')
  async addExercise(  @Param('id') workoutId: string, 
                      @Param('exerciseId') exerciseId: string,
                      @Query('sets') sets: number,
                      @Query('reps') reps: number,
                      @Query('duration') duration: number, 
                      @Query('distance') distance: number
                    )
                    : Promise<Workout> {
    return this.workoutService.addExercise(workoutId, exerciseId, sets || 1, reps || 0, duration || 0, distance || 0); 
  } 

  @Put('rmexercise/:id/:mappingId')
  async removeExercise(@Param('id') workoutId: string, @Param('mappingId') mappingId: string): Promise<Workout> {
    return this.workoutService.removeExercise(workoutId, mappingId);
  }

  @Delete(':id')
  async removeWorkout(@Param('id') workoutId: string): Promise<void> {
    return this.workoutService.remove(workoutId);
  }
}

