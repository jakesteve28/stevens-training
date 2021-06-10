import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "../entities/dto/user.dto";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import * as bcrypt from 'bcrypt';
import { OnModuleDestroy } from "@nestjs/common";
import { findDistance, isLatitude, isLongitude } from "../util/distance.util";
import { HasUploads } from "./story.service";
import { UploadService } from "./upload-file.service";

@Injectable()
export class UserService implements OnModuleDestroy, HasUploads {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @Inject(forwardRef(() => UploadService))
        private uploadService: UploadService
    ) {}

    async onModuleDestroy(): Promise<void> {
        console.log("Destroying user service, marking all users as offline, clear cache, refresh tokens & location");
        await this.userRepository.update({ isOnline: true }, { isOnline: false, refreshToken: '', latitude: '', longitude: '' });
    }

    async create(userDto: UserDto): Promise<User> {
        const user = new User();
        user.email = userDto.email;
        user.firstName = userDto.firstName; 
        user.lastName = userDto.firstName;
        user.userName = userDto.userName; 
        user.password = await bcrypt.hash(userDto.password, 10);
        return this.userRepository.save(user);
    }

    async checkStoredHashToken(username: string, refreshToken: string): Promise<Boolean> {
        const user = await this.findUsername(username);
        if(user) {
            return bcrypt.compare(refreshToken, user.refreshToken); 
        } else return false;
     }

    async findOne(id: string): Promise<User> {
        return this.userRepository.findOne(id); 
    }

    async findUsername(username: string): Promise<User> {
        return this.userRepository.findOne({ where: { userName: username }}); 
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find(); 
    }

    async findNearLocation(latitude: number, longitude: number, howfar: number): Promise<User[]> {
        //EXPENSIVE, need to cache the results of this calculation
        //Or run a python script that has these location libraries
        const users = await this.userRepository.find({ cache: 5000, select: ['id', 'latitude', 'longitude' ]});
        if(isLatitude(latitude) && isLongitude(longitude)) {
            const nearbyUsers = users.filter(user => {
                const latnum = parseFloat(user.latitude);
                const longnum = parseFloat(user.longitude); 
                if(isLatitude(latnum) && isLongitude(longnum)) {
                    const distance = findDistance(latitude, latnum, longitude, longnum);
                    user['howfar'] = distance;
                    return user['howfar'] < howfar;
                }
            })
            return nearbyUsers.sort((a, b) => b['howfar'] - a['howfar']);
        }
        return [];
    }

    async markLoggedIn(userId: string): Promise<User> {
        const user = await this.userRepository.findOne(userId);
        user.isOnline = true;
        return this.userRepository.save(user);
    }

    async markLoggedOut(userId: string): Promise<User> {
        const user = await this.userRepository.findOne(userId);
        user.isOnline = false;
        return this.userRepository.save(user);
    }

    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }

    async newPassword(id: string, pw: string): Promise<User> {
        const user = await this.userRepository.findOne(id);
        user.password = await bcrypt.hash(pw, 10); 
        return this.userRepository.save(user); 
    }

    async disable(id: string): Promise<void> {
        const user = await this.userRepository.findOne(id);
        user.disabled = true;
        this.userRepository.save(user);
    }

    async enable(id: string): Promise<void> {
        const user = await this.userRepository.findOne(id);
        user.disabled = false;
        this.userRepository.save(user);
    }

    async updateLocation(id: string, latitude: string, longitude: string): Promise<User> {
        const user = await this.userRepository.findOne(id);
        user.latitude = latitude;
        user.longitude = longitude;
        return this.userRepository.save(user);
    }

    async updateToken(id: string, token: string): Promise<User> {
        const user = await this.userRepository.findOne(id); 
        user.refreshToken = await bcrypt.hash(token, 10);
        return this.userRepository.save(user);
    }

    async addUpload(userId: string, uploadId: string): Promise<User> {
        const user = await this.userRepository.findOne(userId);
        if(!user) return null;
        if(user.profilePictures.some(element => element.id === uploadId)) {
            return null; 
        }
        const _upload = await this.uploadService.setEntityId(uploadId, user.id); 
        user.profilePictures.push(_upload); 
        return this.userRepository.save(user);
    }

    async removeUpload(userId: string, uploadId: string): Promise<User> {
        const user = await this.userRepository.findOne(userId);
        if(!user) return null;
        if(user.profilePictures.some(element => element.id === uploadId)) {
            user.profilePictures = user.profilePictures.filter(async upload => {
                if(upload.id === uploadId){
                    await this.uploadService.remove(uploadId);
                }
                return upload.id !== uploadId;
            });
            return this.userRepository.save(user); 
        }
        return user;
    }

}