import { Module } from '@nestjs/common';
import { PlaceController } from '../controllers/place.controller';
import { PlaceService } from '../providers/place.service';

@Module({
    imports: [],
    providers: [PlaceService],
    controllers: [PlaceController],
    exports: []
})
export class PlaceModule {}
    
