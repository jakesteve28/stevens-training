import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { UserService } from "./user.service";
import * as bcrypt from 'bcrypt';
import { ConfigService } from "@nestjs/config";

export interface jwtPayload {
    username: string,
    sub: string 
 }

@Injectable()
export class SignOnService {
    constructor(
                @Inject(forwardRef(() => UserService))
                private userService: UserService,
                private jwtService: JwtService,
                private config: ConfigService
        ) { }

    async loginUser(user: any) {
        if(!(await this.userService.markLoggedIn(user.id))) {
            console.error("Cannot mark user logged in. ID: ", user.id); 
            return null;
        } else {
            return user;     
        }
    }

    async newRefreshToken(user: any) {
        const payload: jwtPayload = {
            username: user?.userName, 
            sub: user?.id
        }
        const refreshToken = this.jwtService.sign(payload, {
            secret: await this.config.get('REFRESH_SECRET'),
            expiresIn: '900s'
        });
        //await this.userService.updateToken(user?.id, refreshToken); 
        return refreshToken;
    }
    
    async validateUser(userName: string, password: string): Promise<any> {
        const user = await this.userService.findUsername(userName); 
        const isMatch = await bcrypt.compare(password, user.password); 
        if(isMatch) delete user.password;
        return (isMatch) ? user : false;
    }

    async logoutUser(user: any): Promise<Boolean> {
        if(!(await this.userService.markLoggedOut(user.id))) {
            console.error("Cannot mark user logged in. ID: ", user.id); 
            return null;
        } else {
            return user;     
        }
    }

    async forgotPassword(user: any): Promise<Boolean> {
        return false;
    }
}