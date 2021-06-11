/** 
    2021 Jacob Stevens   
*/

import { Controller, Post, UseGuards, Req, Get, Logger } from '@nestjs/common';
import { ExerciseService } from '../providers/exercise.service';
import { WorkoutService } from '../providers/workout.service';
import { SignOnAuthGuard } from '../guards/signon.auth-guard';
import { Res } from '@nestjs/common';
import { SignOnService } from '../providers/signon.service';
import { Response } from 'express';
import JwtRefreshAuthGuard from '../guards/jwt-refresh.auth-guard';

@Controller('signon')
export class SignonController {
  constructor(private workoutService: WorkoutService, 
              private exerciseService: ExerciseService,
              private signOnService: SignOnService
              ) {}

  private readonly logger = new Logger(SignonController.name);

  @UseGuards(SignOnAuthGuard)
  @Post('login')
  async login(@Req() req, @Res() res: Response) {
    res.clearCookie('Refresh');
    const refreshToken = await this.signOnService.newRefreshToken(req.user);
    await this.signOnService.loginUser(req.user);
    res.cookie('Refresh', refreshToken, { maxAge: 900000, httpOnly: true }); 
    return res.send({ user: req.user }); 
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('logout')
  async logout(@Req() req, @Res() res: Response) {
    res.clearCookie('Refresh');
    if(!(await this.signOnService.logoutUser(req.user))){
      console.error("Cannot mark user as logged out. ID: ", req.user.id); 
      return res.status(500).send({ error: "logout failed" }); 
    } else {
      res.send({ loggedOut: true })
    }
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Get('refresh')
  async getRefreshToken(@Req() req, @Res() res: Response) {
    res.clearCookie('Refresh');
    const newToken = await this.signOnService.newRefreshToken(req.user);
    res.cookie('Refresh', newToken, { maxAge: 900000, httpOnly: true }); 
    return res.send({ user: req.user });
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Get('tokenLogin')
  async tokenLogin(@Req() req, @Res() res: Response) {
      await this.signOnService.loginUser(req.user); 
      return res.send({ user: req.user })
  }

  @Post('resetPassword')
  async resetPassword(@Req() req, @Res() res: Response) {
    //Clear password, send one time link to resetpw form to email
    //return res.send()
  }
}

