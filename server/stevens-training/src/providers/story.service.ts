import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { Story } from "../entities/story.entity";
import { UploadService } from "./upload-file.service";

export interface HasUploads {
    addUpload: Function;  
    removeUpload: Function;
}

@Injectable()
export default class StoryService implements HasUploads {
    constructor(
        @InjectRepository(Story) 
        private storyRepo: Repository<Story>,
        private uploadService: UploadService
    ) {}
    async create(user: User): Promise<Story> {
        const story = new Story();
        story.user = user; 
        return this.storyRepo.save(story); 
    }
    async addUpload(storyId: string, uploadId: string): Promise<Story> {
        const story = await this.storyRepo.findOne(storyId);
        if(!story) return null;
        if(story.uploads.some(element => element.id === uploadId)) {
            return null; 
        }
        const _upload = await this.uploadService.setEntityId(uploadId, story.id); 
        story.uploads.push(_upload); 
        return this.storyRepo.save(story);
    }
    async removeUpload(storyId: string, uploadId: string): Promise<Story> {
        const story = await this.storyRepo.findOne(storyId);
        if(!story) return null;
        if(story.uploads.some(element => element.id === uploadId)) {
            story.uploads = story.uploads.filter(async upload => {
                if(upload.id === uploadId){
                    await this.uploadService.remove(uploadId);
                }
                return upload.id !== uploadId;
            });
            return this.storyRepo.save(story); 
        }
        return story;
    }
    async clearStory(storyId: string): Promise<Story> {
        const story = await this.storyRepo.findOne(storyId); 
        if(!story) return null;
        story.uploads.forEach(async element => {
            await this.uploadService.remove(element.id); 
        });
        story.uploads = []; 
        return this.storyRepo.save(story);   
    }
}