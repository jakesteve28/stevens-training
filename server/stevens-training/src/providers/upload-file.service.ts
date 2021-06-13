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
import { open, stat, readFile, FileHandle, access, mkdir, writeFile, unlink } from 'fs/promises';
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
        const upload = new MediaUpload(),
            tempFilePath = path.resolve(`./tmp/${file.filename}`),
            ext = extname(`${file.filename}`),
            uploadFileName = `upload-${uuid()}${ext}`,     
            userDirPath = `./uploads/${user.id}/`,
            fullPath = userDirPath + uploadFileName,
            tempFd = await open(tempFilePath, 'r');

        if(!tempFd){ console.log('Cannot find temp file upload, failing new upload.'); return null; } 
        const tempFile = await tempFd.readFile({ encoding: 'base64' }); 
        if(!tempFile){ console.log("Critical fs error, failing new upload"); return null; }
        if(!(await stat(userDirPath))) await mkdir(userDirPath, { recursive: true });
        try {
            await writeFile(fullPath, tempFile, { encoding: 'base64' });
            await unlink(tempFile); 
            upload.uploadType = uploadType; 
            upload.path = fullPath; 
            upload.desc = desc || "";
            upload.user = user;
            return this.uploadRepo.save(upload); 
        } catch(err) {
            console.log('Error writing new file to user directory. User ID: ', user.id, err);
            return null; 
        } finally {
            tempFd.close();      
        }
    }

    public async rmUpload(userId: string, uploadId: string): Promise<Boolean> {
        const user = await this.userService.findOne(userId); 
        if(!user) return false; 
        const upload = await this.uploadRepo.findOne(uploadId);
        if(!upload) return false; 
        await unlink(upload.path); 
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
        });        
        return false;
    }

}