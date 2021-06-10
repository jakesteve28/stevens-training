import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MediaUpload, UploadType } from "../entities/media-upload.entity";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";

@Injectable()
export class UploadService {
    constructor(@InjectRepository(MediaUpload) private uploadRepo: Repository<MediaUpload>) {}
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
    async setEntityId(id: string, entityId: string;): Promise<MediaUpload> {
        const upload = await this.uploadRepo.findOne(id);
        if(!upload) return null; 
        upload.entityId = entityId; 
        return this.uploadRepo.save(upload); 
    }
}