/** 
    2021 Jacob Stevens   
*/

import { Controller, Post, Body, UseGuards, Req, Put, Get, Delete, Logger, Param, Res, Header, Query, Inject, forwardRef } from '@nestjs/common';
import { UserDto } from '../entities/dto/user.dto';
import JwtRefreshAuthGuard from '../guards/jwt-refresh.auth-guard';
import { User } from '../entities/user.entity';
import { UserService } from '../providers/user.service';
import { Response } from 'express';
import { NewUserAuthGuard } from '../guards/newuser.auth-guard';
import { StoryService } from '../providers/story.service';
import { Message } from '../entities/message.entity';
import { Place } from '../entities/place.entity';
import { PlaceService } from '../providers/place.service';
import { CheckinService } from '../providers/checkin.service';
import { Checkin } from '../entities/checkin.entity';

class Location {
  latitude: string; 
  longitude: string; 
}

@Controller('user')
export class UserController {
  constructor(private userService: UserService,
              private storyService: StoryService,
              private placeService: PlaceService,
              private checkinService: CheckinService
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
      await this.userService.setStoryId(user, story.id); 
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

  @Get('nearby/:distance')
  @UseGuards(JwtRefreshAuthGuard)
  async getNearbyUser(@Req() req: any, @Param('distance') distance: string): Promise<User[]> {
      this.logger.log(`Fetching users nearby ${req.user.id}`);
      if(!req.user) return null; 
      return this.userService.findNearLocation(parseFloat(req.user.latitude), parseFloat(req.user.longitude), parseFloat(distance)); 
  }

  @Get('nearbyplaces/:distance')
  @UseGuards(JwtRefreshAuthGuard)
  async getNearbyPlaces(@Req() req: any, @Param('distance') distance: string): Promise<Place[]> {
      this.logger.log(`Fetching places nearby ${req.user.id}`);
      if(!req.user) return null; 
      return this.placeService.getNearbyPlaces(req.user.latitude, req.user.longitude, distance); 
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
  async sendMessage(@Req() req, @Param('to') to, @Body() body): Promise<Message> {
    this.logger.log(`Creating message from user ${req.user.userName} to ${body?.status}`);
    return this.userService.sendMessage(req.user.id, body?.message, to); 
  }

  @Post('checkin/:id')
  @UseGuards(JwtRefreshAuthGuard)
  async checkin(@Req() req, @Param('id') id): Promise<[Place, Checkin]> {
    const place = await this.placeService.findOne(id); 
    this.logger.log(`Checkin for user ${req.user.userName} at ${place.name}`);
    const checkin = await this.checkinService.create(req.user.id, place.id); 
    return [place, checkin]; 
  }

  @Post('checkout')
  @UseGuards(JwtRefreshAuthGuard)
  async checkout(@Req() req): Promise<Checkin[]> {
    const checkins = await this.checkinService.checkOut(req.user.id); 
    this.logger.log(`Checking out all checkins for user: ${req.user.userName}`);
    return checkins; 
  }

  @Get('checkins')
  @UseGuards(JwtRefreshAuthGuard)
  async getCheckins(@Req() req): Promise<Checkin[]> {
    this.logger.log(`Fetching all checkins for user ${req.user.userName}`);
    const checkins = await this.checkinService.getCheckins(req.user.id); 
    return checkins; 
  }

  @Delete('/checkin/:id')
  @UseGuards(JwtRefreshAuthGuard)
  async removeCheckin(@Req() req, @Param('id') checkinId: string): Promise<void> {
    this.logger.log(`Deleting checkin with id: ${checkinId} for user ${req.user.userName}`);
    return this.checkinService.deleteCheckin(checkinId);
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
