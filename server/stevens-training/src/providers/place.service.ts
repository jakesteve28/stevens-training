import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Place } from "../entities/place.entity";
import { Repository } from "typeorm";
import { PlaceDto } from "../entities/dto/place.dto";
import { User } from "../entities/user.entity";

@Injectable()
export class PlaceService {
    constructor(@InjectRepository(Place) private placeRepo: Repository<Place>) {}

    async create(place: PlaceDto): Promise<Place> {
        return null;
    }

    async updateLocation(placeId: string, latitude: string, longitude: string): Promise<Place> {
        return null;
    }

    async uploadPic(placeId: string, path: string): Promise<Place> {
        return null;
    }

    async updateDesc(placeId: string, desc: string): Promise<Place> {
        return null;
    }

    async updateName(placeId: string, name: string): Promise<Place> {
        return null;
    }

    async remove(placeId: string): Promise<void> {
        return;
    }

    async getUsers(placeId: string): Promise<User[]> {
        return null;
    }

    async setOwner(placeId: string, userId: string): Promise<Place> {
        return null; 
    }

    async setStatus(placeId: string, open: Boolean): Promise<Place> {
        return null;
    }

}