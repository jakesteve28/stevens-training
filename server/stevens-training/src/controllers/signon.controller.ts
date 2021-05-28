/** 
    2021 Jacob Stevens   
*/

import { Controller, Post, Body, UseGuards, Req, Put, Get, Delete } from '@nestjs/common';
import ExerciseService from '../providers/exercise.service';
import WorkoutService from '../providers/workout.service';
import { User } from '../entities/user.entity';

@Controller('signon')
export class SignonController {
  constructor(private workoutService: WorkoutService, 
              private exerciseService: ExerciseService) {}

  @Post('login')
  async login(): Promise<void> {
      return null;
  }

  @Post('logout')
  async logout(): Promise<void> {
    return null;
  }

  @Get('refresh')
  async getRefreshToken(): Promise<void> {
      return null;
  }

  @Post('verify')
  async verifyLogin(): Promise<Boolean> {
      return false;
  }

}

