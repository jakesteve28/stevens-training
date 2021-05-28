/** 
    2021 Jacob Stevens   
*/

import { Controller, Post, Body, UseGuards, Req, Put, Get, Delete } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from '../providers/user.service';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUser(): Promise<User> {
      return null;
  }
  /**
   * Creates a new user with a username, necessary details and a user-stats entity, returns it... or returns null if failed
   * @param req for the req.user object 
   */
  @Post('create')
  async createUser(@Req() req): Promise<User> {
    return null;
  }

  @Put('update')
  async updateUser(): Promise<User> {
    return null;
  }

  @Get('refresh')
  async refreshToken(): Promise<User> {
    return null;
  }

  @Post('profilepic')
  async uploadProfilePic() {

  }

  @Get('profilepic')
  async fetchProfilePic() {

  }

  @Get('story')
  async fetchStory() {

  }

  @Put('story')
  async updateStory() {

  }

  @Delete(':id')
  async deleteUser(userId: string) {

  }
}
