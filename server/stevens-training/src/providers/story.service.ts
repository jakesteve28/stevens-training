import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { Story } from "../entities/story.entity";

@Injectable()
export default class StoryService {
    constructor(@InjectRepository(Story) private storyRepo: Repository<Story>) {}
    async create(user: User): Promise<Story> {
        return null;
    }
    async addUpload() {
        
    }
}