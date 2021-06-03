import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UserService } from "./user.service";

@Injectable()
export class SignOnService {
    constructor(private userService: UserService) { }

    async loginUser(user: any) {
        if(!(await this.userService.markLoggedIn(user.id))) {
            console.error("Cannot mark user logged in. ID: ", user.id); 
            return null;
        } else {
            return user;     
        }
    }
    async newRefreshToken(user: any) {
      throw new Error('Method not implemented.');
    }
    
    async validateUser(userName: string, password: string): Promise<User> {
        return null;
    }
    async logoutUser(user: any): Promise<Boolean> {
        return false;
    }
}