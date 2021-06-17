/** 
    2021 Jacob Stevens   
*/

import { Controller, Post, Body, UseGuards, Req, Put, Get, Delete, Logger, Param } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Place } from '../entities/place.entity';
import { PlaceService } from '../providers/place.service';
import { UserService } from '../providers/user.service';
import JwtRefreshAuthGuard from '../guards/jwt-refresh.auth-guard';
import { PlaceDto } from '../entities/dto/place.dto';

@Controller('place')
@UseGuards(new JwtRefreshAuthGuard())
export class PlaceController {
  constructor(private placeService: PlaceService,
                private userService: UserService
                ) {}

  private readonly logger = new Logger(PlaceController.name);
  
  @Get(':id')
  async getPlace(@Param('id') placeId: string): Promise<Place> {
    this.logger.log(`Get place ${placeId}`);
    return this.placeService.findOne(placeId); 
  }

  @Post('add')
  async addPlace(@Req() req, @Body() placeDto: PlaceDto): Promise<Place> {
    this.logger.log(`Create place by user ${req.user.userName}`);     
    return this.placeService.create(placeDto);
  }

  @Delete(':id')
  async deletePlace(@Req() req, @Param('id') placeId: string): Promise<void> {
    this.logger.log(`Remove place ${placeId} by user ${req.user.userName}`);
    return this.placeService.remove(placeId);
  }

  @Get(':id/users/:radiusmiles')
  async fetchNearbyUsers(@Param('id') placeId: string, @Param('radiusmiles') miles: number) : Promise<User[]> {
    this.logger.log(`Get users nearby place ${placeId}, ${miles} radius`);
    return this.placeService.getNearbyUsers(placeId, miles); 
  }
}
