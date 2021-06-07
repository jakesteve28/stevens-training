import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Gallery } from "../entities/gallery.entity";
import { Repository } from "typeorm";
import { Story } from "../entities/story.entity";
import { Exercise } from "../entities/exercise.entity";
import { Place } from "../entities/place.entity";

@Injectable()
export class GalleryService {
    constructor(@InjectRepository(Gallery) private galleryRepository: Repository<Gallery>) {}
    
    async createForStory(story: Story): Promise<Gallery> {
        return null;
    }

    async createForExercise(exercise: Exercise): Promise<Gallery> {
        return null;
    }

    async createForPlace(place: Place): Promise<Gallery> {
        return null; 
    }

    async addUpload(uploadId: string): Promise<Gallery> {
        return null; 
    }

    async removeUpload(uploadId: string): Promise<Gallery> {
        return null; 
    }

    async remove(id: string): Promise<void> {
        return;
    }
}