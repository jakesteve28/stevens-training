import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/entities/dto/user.dto";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async create(userDto: UserDto): Promise<User> {
        
        return null;
    }

    async findOne(id: string): Promise<User> {

        return null;
    }

    async findAll(): Promise<User> {

        return null;
    }

    async markLoggedIn(userId: string): Promise<Boolean> {
        return false;
    }

    async markLoggedOut(userId: string): Promise<Boolean> {
        return false;
    }

    async remove(id: string): Promise<void> {

        return null;
    }

    async update(newFields: any): Promise<User> {

        return null;
    }

    async newPassword(id: string, pw: string): Promise<User> {

        return null;
    }

    async newProfilePic(id: string, path: string): Promise<User> {

        return null;
    }

    async disable(id: string): Promise<void> {

    }

    async enable(id: string): Promise<void> {

    }

}