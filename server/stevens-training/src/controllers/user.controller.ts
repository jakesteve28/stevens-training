/** 
    2021 Jacob Stevens   
*/

import { Controller, Post, Body, UseGuards, Req, Put, Get, Delete, Logger, Param, Res, Header } from '@nestjs/common';
import { UserDto } from '../entities/dto/user.dto';
import JwtRefreshAuthGuard from '../guards/jwt-refresh.auth-guard';
import { User } from '../entities/user.entity';
import { UserService } from '../providers/user.service';
import { Response } from 'express';
import { NewUserAuthGuard } from '../guards/newuser.auth-guard';
import { StoryService } from '../providers/story.service';

class Location {
  latitude: string; 
  longitude: string; 
}

@Controller('user')
export class UserController {
  constructor(private userService: UserService,
              private storyService: StoryService
             ) {}

  private readonly logger = new Logger(UserController.name);


  @Get('story')
  @UseGuards(JwtRefreshAuthGuard)
  async fetchStory(@Req() req) {
    this.logger.log(`Fetching story for user ${req.user.userName}`);
    if(!req.user) return null; 
    const user = await this.userService.findOne(req.user.id);   
    if(user.storyId !== "") {
      return this.storyService.findOne(user.storyId); 
    } else {
      const story = await this.storyService.create();
      const _user = await this.userService.setStoryId(user, story.id); 
      return story;
    }
  }

  @Get(':id')
  @UseGuards(JwtRefreshAuthGuard)
  async getUser(@Req() req: any, @Param('id') userId: string): Promise<User> {
      this.logger.log(`Fetching user ${userId}`);
      if(!req.user) return null; 
      if(req.user?.id === userId) return req.user; 
  }
  /**
   * Creates a new user with a username, necessary details and a user-stats entity, returns it... or returns null if failed
   * @param req for the req.user object 
   */
  @Post('create')
  @UseGuards(NewUserAuthGuard)
  async createUser(@Res() res: Response, @Body() newUser: UserDto) {
      this.logger.log(`Creating new user with email ${newUser.email}`);
      res.clearCookie('Refresh');
      const result = await this.userService.create(newUser);
      if(!result || !result.user || !result.token) {
        this.logger.error(`User with username: ${newUser.userName} and email: ${newUser.email} already exists`); 
        return res.send({ error: "User with username and email already exists" })
      }
      res.cookie('Refresh', result.token, { maxAge: 900000, httpOnly: true });
      delete result.user.password; 
      delete result.user.refreshToken; 
      this.logger.log(`New user created ${result.user.userName}, refresh token created. Expires ${new Date(Date.now() + 900000).toISOString()}`);
      return res.send(result.user); 
    }

  @Put('location')
  @UseGuards(JwtRefreshAuthGuard)
  async updateLocation(@Req() req, @Body() body: Location): Promise<User> {
    this.logger.log(`Updating location for user ${req.user.userName}`);
    const user = await this.userService.findOne(req.user.id); 
    this.logger.log(`User location updated ${user.userName} Latitude: ${body.latitude} Longitude: ${body.longitude}`);
    if(user) {
      const _user = await this.userService.updateLocation(user.id,  body.latitude, body.longitude); 
      return _user;
    } return null;
  }

  @Put('status')
  @UseGuards(JwtRefreshAuthGuard)
  async updateStatus(@Req() req, @Body() body): Promise<User> {
    this.logger.log(`Updating user status ${req.user.userName} to ${body?.status}`);
    return this.userService.updateStatus(req.user.id, body?.status); 
  }

  @Put('maxes')
  @UseGuards(JwtRefreshAuthGuard)
  async updateMaxes(@Req() req, @Body() body): Promise<User> {
    this.logger.log(`Updating user maxes ${req.user.userName} to ${body?.maxes}`);
    return this.userService.setMaxes(req.user.id, body?.maxes); 
  }

  @Put('setprimary/:id')
  @UseGuards(JwtRefreshAuthGuard)
  async updatePrimary(@Req() req, @Param('id') id): Promise<User> {
    this.logger.log(`Setting primary upload for user ${req.user.userName} to ${id}`);
    return this.userService.setPrimaryUpload(req.user.id, id); 
  }

  @Put('currentWorkout/:workoutId')
  @UseGuards(JwtRefreshAuthGuard)
  async setCurrentWorkout(@Req() req, @Param('workoutId') workoutId: string): Promise<User> {
    this.logger.log(`Updating current workout for user ${req.user.userName} to ${workoutId}`);
    return this.userService.setCurrentWorkout(req.user.id, workoutId); 
  }

  @Post('message/:to')
  @UseGuards(JwtRefreshAuthGuard)
  async sendMessage(@Req() req, @Param('to') to, @Body() body): Promise<User> {
    this.logger.log(`Creating message from user ${req.user.userName} to ${body?.status}`);
    return this.userService.sendMessage(req.user.id, body?.message, to); 
  }

  @Delete(':id')
  @UseGuards(JwtRefreshAuthGuard)
  async deleteUser(@Req() req, @Param('id') userId: string): Promise<void> {
    this.logger.log(`Deleting user ${userId}`);
    if(req.user.userName !== "admin") return null;
    this.logger.log(`Admin request for delete issued for user with ID: ${userId}`);
    return this.userService.remove(userId);
  }
}
