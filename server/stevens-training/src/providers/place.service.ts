import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Place } from "../entities/place.entity";
import { Repository } from "typeorm";
import { PlaceDto } from "../entities/dto/place.dto";
import { User } from "../entities/user.entity";
import { UserService } from "./user.service";
import { UploadService } from "./upload-file.service";
import { findDistance } from "src/util/distance.util";

@Injectable()
export class PlaceService {
    constructor(@InjectRepository(Place) private placeRepo: Repository<Place>,
                @Inject(forwardRef(() => UserService))
                private userService: UserService,
                @Inject(forwardRef(() => UploadService))
                private uploadService: UploadService
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

    async getNearbyPlaces(latitude: string, longitude: string, howfar: string): Promise<Place[]> {
        //howfar is radius around given lat/long expressed in miles
        const numLat = parseFloat(latitude), numLong = parseFloat(longitude), threshold = parseFloat(howfar);
        const places = await this.placeRepo.find(); 
        const retPlaces = []; 
        for(let place of places) {
            const placeLat = parseFloat(place.latitude), placeLong = parseFloat(place.longitude); 
            const distance = findDistance(numLat, numLong, placeLat, placeLong); 
            if(threshold >= distance) {
                retPlaces.push(place);
            }
        }
        return retPlaces;
    }

    async findOne(placeId: string): Promise<Place> {
        return this.placeRepo.findOne(placeId);
    }

    async updateLocation(placeId: string, latitude: string, longitude: string): Promise<Place> {
        const place = await this.placeRepo.findOne(placeId);
        place.latitude = latitude; 
        place.longitude = longitude; 
        return this.placeRepo.save(place);
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
        //howfar is radius around given lat/long expressed in miles
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

    async addUpload(placeId: string, uploadId: string): Promise<Place> {
        const place = await this.placeRepo.findOne(placeId);
        if(!place) return null;
        if(place.uploads.some(element => element.id === uploadId)) {
            return null; 
        }
        const _upload = await this.uploadService.setEntityId(uploadId, place.id); 
        place.uploads.push(_upload); 
        return this.placeRepo.save(place);
    }

    async removeUpload(placeId: string, uploadId: string): Promise<Place> {
        const place = await this.placeRepo.findOne(placeId);
        if(!place) return null;
        if(place.uploads.some(element => element.id === uploadId)) {
            place.uploads = place.uploads.filter(async upload => {
                if(upload.id === uploadId){
                    if(place.primaryUpload === upload.id) place.primaryUpload = ""; 
                    await this.uploadService.remove(uploadId);
                }
                return upload.id !== uploadId;
            });
            return this.placeRepo.save(place); 
        }
        return place;
    }

    async setPrimaryUpload(placeId: string, uploadId: string): Promise<Place> {
        const place = await this.placeRepo.findOne(placeId);
        if(!place) return null;
        for(let upload of place.uploads) {
            if(upload.id === uploadId) {
                place.primaryUpload = upload.id; 
                return this.placeRepo.save(place); 
            }
        } return null; 
    }

}