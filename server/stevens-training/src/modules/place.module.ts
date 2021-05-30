import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from '../entities/place.entity';
import { PlaceController } from '../controllers/place.controller';
import { PlaceService } from '../providers/place.service';

@Module({
    imports: [TypeOrmModule.forFeature([Place])],
    providers: [PlaceService],
    controllers: [PlaceController],
    exports: []
})
export class PlaceModule {}
    
