/** 
    2021 Jacob Stevens   
*/

import { Controller, Post, Body, UseGuards, Req, Put, Get, Delete, Logger, Param, Res } from '@nestjs/common';
import { UserDto } from '../entities/dto/user.dto';
import JwtRefreshAuthGuard from '../guards/jwt-refresh.auth-guard';
import { User } from '../entities/user.entity';
import { UserService } from '../providers/user.service';
import { Response } from 'express';
import { NewUserAuthGuard } from '../guards/newuser.auth-guard';
import { SignOnService } from '../providers/signon.service';
import { StoryService } from '../providers/story.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService,
              private signOnService: SignOnService,
              private storyService: StoryService
    ) {}

  private readonly logger = new Logger(UserController.name);

  @Get(':id')
  @UseGuards(JwtRefreshAuthGuard)
  async getUser(@Req() req, @Param('id') userId: string): Promise<User> {
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

  @Get('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(@Res() res: Response, @Req() req): Promise<User> {
    res.clearCookie('Refresh');
    const newToken = await this.signOnService.newRefreshToken(req.user); 
    res.cookie('Refresh', newToken, { maxAge: 900000, httpOnly: true });
    const user = await this.userService.updateToken(req.user.id, newToken); 
    this.logger.log(`New refresh token for user ${user.userName} created. Expires ${new Date(Date.now() + 900000).toISOString()}`);
    return user;
  }

  @Get('story')
  @UseGuards(JwtRefreshAuthGuard)
  async fetchStory(@Req() req) {
    const user = await this.userService.findOne(req.user.id);   
    if(user.storyId !== "") {
      return this.storyService.findOne(user.storyId); 
    } else {
      user.storyId = (await this.storyService.create()).id;
      return user.storyId 
    }
  }

  @Delete(':id')
  @UseGuards(JwtRefreshAuthGuard)
  @UseGuards()
  async deleteUser(@Req() req, @Param('id') userId: string): Promise<void> {
    if(req.user.userName !== "admin") return null;
    this.logger.log(`Admin request for delete issued for user with ID: ${userId}`);
    return this.userService.remove(userId);
  }
}
