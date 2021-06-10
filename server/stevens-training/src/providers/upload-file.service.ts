import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MediaUpload, UploadType } from "../entities/media-upload.entity";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { Story } from "../entities/story.entity";
import { Workout } from "../entities/workout.entity";
import { Exercise } from "../entities/exercise.entity";
import { Place } from "../entities/place.entity";
import { UserService } from "./user.service";
import { StoryService } from "./story.service";
import { WorkoutService } from "./workout.service";
import { PlaceService } from "./place.service";
import { ExerciseService } from "./exercise.service";
import * as fs from "fs";
import path, { extname } from "path";
import { uuid } from "uuidv4";

@Injectable()
export class UploadService {
    constructor(
        @InjectRepository(MediaUpload) 
        private uploadRepo: Repository<MediaUpload>,
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
        @Inject(forwardRef(() => StoryService))
        private storyService: StoryService, 
        @Inject(forwardRef(() => WorkoutService))
        private workoutService: WorkoutService, 
        @Inject(forwardRef(() => PlaceService))
        private placeService: PlaceService, 
        @Inject(forwardRef(() => ExerciseService))
        private exerciseService: ExerciseService
        ) {}

    async create(path: string, uploadType: UploadType, desc: string, user: User): Promise<MediaUpload> {
        const upload = new MediaUpload()
        upload.path = path; 
        upload.uploadType = uploadType; 
        upload.desc = desc; 
        upload.user = user; 
        return upload;
    }

    async remove(id: string): Promise<void> {
        this.uploadRepo.delete(id);
    }

    async findOne(id: string): Promise<MediaUpload> {
        return this.uploadRepo.findOne(id); 
    }

    async setEntityId(id: string, entityId: string): Promise<MediaUpload> {
        const upload = await this.uploadRepo.findOne(id);
        if(!upload) return null; 
        upload.entityId = entityId; 
        return this.uploadRepo.save(upload); 
    }

    async getRelatedEntity(uploadId: string): Promise<Story | User | Workout | Exercise | Place> {
        const upload = await this.uploadRepo.findOne(uploadId); 
        if(!upload || !upload.entityId) {
            return null; 
        }
        switch(upload.uploadType) {
            case UploadType.Exercise: 
                return this.exerciseService.findOne(upload.entityId); 
            case UploadType.Place: 
                return this.placeService.findOne(upload.entityId); ; 
            case UploadType.Workout: 
                return this.workoutService.findOne(upload.entityId); 
            case UploadType.ProfilePic: 
                return this.userService.findOne(upload.entityId); 
            case UploadType.Story: 
                return this.storyService.findOne(upload.entityId); 
            default: break;
        }
    }

    public async newUpload(user: User, uploadType: UploadType, file: Express.Multer.File, desc?: string): Promise<MediaUpload> {
        const upload = new MediaUpload();
        const tempFilePath = path.resolve(`./tmp/${file.filename}`);
        fs.readFile(tempFilePath, 
            { encoding: "base64" },
            async (err, data) => {
                if(err){
                    console.log('Cannot load temp file upload', err); 
                    return;
                }
                const ext = extname(`${file.filename}`); 
                const uploadFileName = `upload-${uuid()}${ext}`;
                const fullPath = `./uploads/${user.id}/${uploadFileName}`;
                if(!fs.existsSync(`./uploads/${user.id}/`)) {
                    fs.mkdir(`./uploads/${user.id}/`, {}, err => {
                        if(err) {
                            console.log("Error creating uploads directory for user ID: " + user.id, err); 
                            return; 
                        }
                        fs.writeFile(fullPath, data, { encoding: "base64" }, err => {
                            if(err) {
                                console.log("Error copying tmp file to uploads folder for user ID: " + user.id);
                                return; 
                            }
                            fs.unlink(`./tmp/${file.filename}`, err => { console.log("Error "  + err.message + " deleting temp file for upload for user ID: " + user.id); return; });
                        })
                        upload.uploadType = uploadType; 
                        upload.path = uploadFileName; 
                        upload.desc = desc || "";
                        upload.user = user;
                        return this.uploadRepo.save(upload); 
                    })
                } else { 
                    fs.writeFile(fullPath, data, { encoding: "base64" }, err => {
                        if(err) {
                            console.log("Error copying tmp file to uploads folder for user ID: " + user.id, err);
                            return; 
                        }
                        fs.unlink(`./tmp/${file.filename}`, err => { console.log("Error deleting " + err + " temp file for upload for user ID: " + user.id); return; });
                    })
                    upload.uploadType = uploadType; 
                    upload.path = uploadFileName; 
                    upload.desc = desc;
                    upload.user = user;
                    return this.uploadRepo.save(upload); 
                }
            }
        )
        return null;
    }

    public async rmUpload(userId: string, uploadId: string): Promise<Boolean> {
        const user = await this.userService.findOne(userId); 
        if(!user) return false; 
        user.uploads.forEach(async upload => {
            if(upload.id === uploadId) {
                const entity = await this.getRelatedEntity(uploadId); 
                if(!entity) return false;
                switch(upload.uploadType) {
                    case UploadType.Exercise: 
                        await this.exerciseService.removeUpload(entity.id, upload.id); 
                        break;
                    case UploadType.Place: 
                        await this.placeService.removeUpload(entity.id, upload.id); 
                        break;
                    case UploadType.Workout: 
                        await this.workoutService.removeUpload(entity.id, upload.id); 
                        break;
                    case UploadType.ProfilePic: 
                        await this.userService.removeUpload(entity.id, upload.id); 
                        break;
                    case UploadType.Story: 
                        await this.storyService.removeUpload(entity.id, upload.id); 
                        break;
                    default: break;
                }
                return true;
            }
        })
        return false;
    }

}