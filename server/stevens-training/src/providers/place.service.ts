import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Place } from "../entities/place.entity";
import { Repository } from "typeorm";
import { PlaceDto } from "../entities/dto/place.dto";
import { User } from "../entities/user.entity";
import { UserService } from "./user.service";

@Injectable()
export class PlaceService {
    constructor(@InjectRepository(Place) private placeRepo: Repository<Place>,
                private userService: UserService
    ) {}

    async create(newPlace: PlaceDto): Promise<Place> {
        const place = new Place();
        place.name = newPlace.name;
        place.desc = newPlace.desc;
        place.placeType = newPlace.placeType;
        place.latitude = newPlace.latitude;
        place.longitude = newPlace.longitude;
        place.uploadedBy = newPlace.uploadedBy; 
        return this.placeRepo.save(newPlace);
    }

    async updateLocation(placeId: string, latitude: string, longitude: string): Promise<Place> {
        const place = await this.placeRepo.findOne(placeId);
        place.latitude = latitude; 
        place.longitude = longitude; 
        return this.placeRepo.save(place);
    }

    async uploadPic(placeId: string, path: string): Promise<Place> {
        return null;
    }

    async updateDesc(placeId: string, desc: string): Promise<Place> {
        const place = await this.placeRepo.findOne(placeId);
        place.desc = desc; 
        return this.placeRepo.save(place);
    }

    async updateName(placeId: string, name: string): Promise<Place> {
        const place = await this.placeRepo.findOne(placeId);
        place.name = name; 
        return this.placeRepo.save(place);
    }

    async remove(placeId: string): Promise<void> {
        this.placeRepo.delete(placeId);
    }

    async getNearbyUsers(placeId: string, howfar: number): Promise<User[]> {
        const place = await this.placeRepo.findOne(placeId);
        if(!place) return null;
        return this.userService.findNearLocation(parseFloat(place.latitude), parseFloat(place.longitude), howfar); 
    }

    async setOwner(placeId: string, userId: string): Promise<Place> {
        const place = await this.placeRepo.findOne(placeId);
        const owner = await this.userService.findOne(userId);
        if(!place || !owner) return null;
        place.uploadedBy = owner.id; 
        return this.placeRepo.save(place);
    }

    async setStatus(placeId: string, open: Boolean): Promise<Place> {
        const place = await this.placeRepo.findOne(placeId);
        place.open = open; 
        return this.placeRepo.save(place);
    }

}