import { PlaceType } from "../place.entity";
export interface PlaceDto {
    name: string; 
    desc: string; 
    longitude: string; 
    latitude: string; 
    placeType: PlaceType;
}