import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from '../entities/place.entity';
import { PlaceController } from '../controllers/place.controller';
import { PlaceService } from '../providers/place.service';
import { UserModule } from './user.module';

@Module({
    imports: [TypeOrmModule.forFeature([Place]), UserModule],
    providers: [PlaceService],
    controllers: [PlaceController],
    exports: [PlaceService]
})
export class PlaceModule {}
    
