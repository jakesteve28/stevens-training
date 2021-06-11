/** 
    2021 Jacob Stevens   
*/

import { Controller, Post, Body, UseGuards, Req, Put, Get, Delete, Logger, Param } from '@nestjs/common';
import { UserDto } from '../entities/dto/user.dto';
import JwtRefreshAuthGuard from '../guards/jwt-refresh.auth-guard';
import { User } from '../entities/user.entity';
import { UserService } from '../providers/user.service';


@Controller('user')
@UseGuards(new JwtRefreshAuthGuard())
export class UserController {
  constructor(private userService: UserService) {}

  private readonly logger = new Logger(UserController.name);

  @Get(':id')
  async getUser(@Req() req, @Param('id') userId: string): Promise<User> {
      if(!req.user) return null; 
      if(req.user?.id === userId) return req.user; 

  }
  /**
   * Creates a new user with a username, necessary details and a user-stats entity, returns it... or returns null if failed
   * @param req for the req.user object 
   */
  @Post('create')
  async createUser(@Body() user: UserDto): Promise<User> {
      const _user = await this.userService.create(user);
      if(_user) {
        return _user; 
      } else {
        return null;
      }
  }

  // @Put('update')
  // async updateUser(): Promise<User> {
  //   return null;
  // }

  @Get('refresh')
  async refreshToken(@Req() req): Promise<User> {
   return null;
  }

  @Get('story')
  async fetchStory() {
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string): Promise<void> {
    return this.userService.remove(userId);
  }
}
