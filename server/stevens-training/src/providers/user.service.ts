import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "../entities/dto/user.dto";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import * as bcrypt from 'bcrypt';
import { OnModuleDestroy } from "@nestjs/common";
import { findDistance, isLatitude, isLongitude } from "../util/distance.util";
import { HasUploads, StoryService } from "./story.service";
import { UploadService } from "./upload-file.service";
import { SignOnService } from "./signon.service";
import { MessageService } from "./message.service";
import { MessageDto } from "src/entities/dto/message.dto";
import { WorkoutService } from "./workout.service";

@Injectable()
export class UserService implements OnModuleDestroy, HasUploads {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @Inject(forwardRef(() => UploadService))
        private uploadService: UploadService,
        @Inject(forwardRef(() => SignOnService))
        private signOnService: SignOnService,
        private storyService: StoryService,
        private messageService: MessageService,
        @Inject(forwardRef(() => WorkoutService))
        private workoutService: WorkoutService
    ) {}

    async onModuleDestroy(): Promise<void> {
        console.log("Destroying user service, marking all users as offline, clear cache, refresh tokens & location");
        await this.userRepository.update({ isOnline: true }, { isOnline: false, refreshToken: '', latitude: '', longitude: '' });
    }

    async create(userDto: UserDto): Promise<{ user: User, token: string }> {
        if(await this.checkUserExists(userDto.email, userDto.userName)) {
            return null;
        }
        const user = new User();
        user.email = userDto.email;
        user.firstName = userDto.firstName; 
        user.lastName = userDto.firstName;
        user.userName = userDto.userName; 
        user.password = await bcrypt.hash(userDto.password, 10);
        const token = await this.signOnService.newRefreshToken(user);
        const story = await this.storyService.create();
        user.refreshToken = await bcrypt.hash(token, 10);
        user.storyId = story.id; 
        user.maxes = "B:0,S:0,DL:0"; 
        user.status = "im noob"; 
        await this.userRepository.save(user);
        return { user: user, token: token };
    }

    async checkUserExists(email: string, username: string): Promise<Boolean> {
        const count = (await this.userRepository.count({ where: [ { userName: username }, { email: email } ] }));
        return count >= 1;
    }

    async checkStoredHashToken(username: string, refreshToken: string): Promise<User> {
        const user = await this.findUsername(username);
        if(user) {
            if(await bcrypt.compare(refreshToken, user.refreshToken)) {
                return user;
            }
        } else return null;
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

    async setStoryId(user: User, storyId: string): Promise<User> {
        user.storyId = storyId;
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

    async sendMessage(userId: string, body: string, to: string): Promise<User> {
        const newMsg: MessageDto = {
            body: body, 
            recipientId: to,
            senderId: userId
        }
        const message = await this.messageService.create(newMsg); 
        if(!message) return null; 
        const user = await this.userRepository.findOne(userId); 
        user.sentmessages.push(message);
        return this.userRepository.save(user); 
    }
    async setCurrentWorkout(userId: string, workoutId: string): Promise<User> {
        const workout = await this.workoutService.findOne(workoutId); 
        if(!workout) return null; 
        const user = await this.userRepository.findOne(userId);
        user.currentWorkoutId = workout.id;
        return this.userRepository.save(user);
    }
    async updateStatus(userId: string, status: string): Promise<User> {
        const user = await this.userRepository.findOne(userId);
        user.status = status;
        return this.userRepository.save(user);
    }
    async setMaxes(userId: string, maxes: string): Promise<User> {
        const user = await this.userRepository.findOne(userId);
        user.maxes = maxes;
        return this.userRepository.save(user);
    }

    async setPrimaryUpload(userId: string, uploadId: string): Promise<User> {
        const user = await this.userRepository.findOne(userId); 
        if(user) {
            for(let upload of user.uploads) {
                if(upload.id === uploadId) {
                    user.primaryUpload = uploadId; 
                    return this.userRepository.save(user); 
                }
            }
        } return null;
    }

}