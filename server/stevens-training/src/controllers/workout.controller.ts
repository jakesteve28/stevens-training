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
  async getWorkout(@Req() req, @Param('id') workoutId: string): Promise<Workout> {
    this.logger.log(`Getting workout ${workoutId}`);
    const workout = await this.workoutService.findOne(workoutId);
    if(req.user.id !== workout.user.id || req.user.id !== 'admin') {
      if(!workout.viewable) {
        this.logger.log(`Workout is not viewable by other users, requested by ${req.user.userName}`);
        return null;
      } else return workout; 
    } else return workout;
  }

  @Post('create')
  async createWorkout(@Req() req, @Body() createWorkoutDto: WorkoutDto): Promise<Workout> {
    this.logger.log(`Creating new workout ${createWorkoutDto.name} by user ${req.user.userName}`);
    return this.workoutService.create(req.user.id, createWorkoutDto);
  }

  @Put('addexercise/:id/:exerciseId')
  async addExercise(  @Req() req,  
                      @Param('id') workoutId: string, 
                      @Param('exerciseId') exerciseId: string,
                      @Query('sets') sets: number,
                      @Query('reps') reps: number,
                      @Query('duration') duration: number, 
                      @Query('distance') distance: number
                    )
                    : Promise<Workout> {
    const workout = await this.workoutService.findOne(workoutId);
    if(workout.user.id !== req.user.id) {
      this.logger.log(`Workout is not editable by other users, requested by ${req.user.userName}, workout is owned by user ID: ${workout.user.userName}`);
      return null;
    }
    this.logger.log(`Adding exercise ${exerciseId} to workout ${workoutId} for user ${req.user.userName}`);
    return this.workoutService.addExercise(workoutId, exerciseId, sets || 1, reps || 0, duration || 0, distance || 0); 
  } 

  @Put('rmexercise/:id/:mappingId')
  async removeExercise(@Req() req, @Param('id') workoutId: string, @Param('mappingId') mappingId: string): Promise<Workout> {
    const workout = await this.workoutService.findOne(workoutId);
    if(workout.user.id !== req.user.id) {
      this.logger.log(`Workout is not editable by other users, requested by ${req.user.userName}, workout is owned by user ID: ${workout.user.userName}`);
      return null;
    }
    this.logger.log(`Removing exercise mapping ${mappingId} from workout ${workoutId} for user ${req.user.userName}`);
    return this.workoutService.removeExercise(workoutId, mappingId);
  }

  @Put('setprimary/:workoutId/:id')
  @UseGuards(JwtRefreshAuthGuard)
  async updatePrimary(@Req() req, @Param('workoutId') workoutId: string, @Param('id') id): Promise<Workout> {
    const workout = await this.workoutService.findOne(workoutId);
    if(workout.user.id !== req.user.id) {
      this.logger.log(`Workout is not editable by other users, requested by ${req.user.userName}, workout is owned by user ID: ${workout.user.userName}`);
      return null;
    }
    this.logger.log(`Setting primary upload for workout ${workoutId} to ${id}`);
    return this.workoutService.setPrimaryUpload(workoutId, id); 
  }

  @Delete(':id')
  async removeWorkout(@Req() req, @Param('id') workoutId: string): Promise<void> {
    const workout = await this.workoutService.findOne(workoutId);
    if(workout.user.id !== req.user.id) {
      this.logger.log(`Workout is not editable by other users, requested by ${req.user.userName}, workout is owned by user ID: ${workout.user.userName}`);
      return null;
    }
    this.logger.log(`Removing workout ${workoutId}`);
    return this.workoutService.remove(workoutId);
  }


}

