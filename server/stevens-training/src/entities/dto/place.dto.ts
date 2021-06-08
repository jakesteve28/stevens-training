import { PlaceType } from "../place.entity";

import {
    Length,
    IsLatitude,
    IsLongitude,
    IsEnum
} from 'class-validator';

export class PlaceDto {
    @Length(2, 128)
    name: string; 

    @Length(0, 512)
    desc: string; 

    @IsLongitude()
    longitude: string; 

    @IsLatitude()
    latitude: string; 

    @IsEnum(PlaceType)
    placeType: PlaceType;
}