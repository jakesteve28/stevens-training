import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MediaUpload } from "src/entities/media-upload.entity";
import { Repository } from "typeorm";

@Injectable()
export class UploadService {
    constructor(@InjectRepository(MediaUpload) private uploadRepo: Repository<MediaUpload>) {}
    async create(upload): Promise<MediaUpload> {
        return null;
    }
    async remove(id: string): Promise<MediaUpload> {
        return null;
    }
    async saveStory(): Promise<MediaUpload> {
        return null; 
    }
}