/** 
    2021 Jacob Stevens   
*/

import { Controller, Post, Body, UseGuards, Req, Put, Get, Delete } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Place } from '../entities/place.entity';
import PlaceService from '../providers/place.service';
import { UserService } from '../providers/user.service';

@Controller('place')
export class PlaceController {
  constructor(private placeService: PlaceService,
                private userService: UserService
                ) {}

  @Get(':id')
  async getPlace(): Promise<Place> {
      return null;
  }

  @Post('add')
  async addPlace(@Req() req): Promise<Place> {
     return null;
  }

  @Delete(':id')
  async deletePlace(): Promise<void> {
    return null;
  }

  @Put('update/:id')
  async updatePlace(): Promise<Place> {
    return null;
  }

  @Put('addmedia')
  async addMedia(): Promise<Place> {
    return null;
  }

  @Put('removemedia/:id')
  async removeMedia(): Promise<Place> {
    return null;
  }

  @Get('users/:id')
  async fetchNearbyUsers() : Promise<User[]> {
      return null;
  }
}
