/**
 * 2021 Jacob Stevens 
 */

 import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
 import { AuthGuard } from '@nestjs/passport';
 import { Request } from 'express'; 
 
 @Injectable()
 export class NewUserAuthGuard extends AuthGuard('newuser') {
     canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request>();
        console.log("New user auth guard allowing pass, in future will require cookie from admin page sent in email");
        return true; 
     }
    //  handleRequest(err, user, info) {
    //     if (err || !user) {
    //         throw err || new UnauthorizedException();
    //       }
    //       return user;
    //  }
 }