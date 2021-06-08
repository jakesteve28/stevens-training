 import { Strategy } from 'passport-local';
 import { PassportStrategy } from '@nestjs/passport';
 import { Injectable, UnauthorizedException } from '@nestjs/common';
 import { SignOnService } from '../../providers/signon.service';
 
 @Injectable()
 export class SignOnStrategy extends PassportStrategy(Strategy) {
   constructor(private signonService: SignOnService) {
     super({
       usernameField: 'userName'
     });
   }
   /**
    * This guard is only called when login is called. 
    * @param userName The userName of the user trying to login
    * @param password The pw of the user
    */
   async validate(userName: string, password: string): Promise<any> {
     const user = await this.signonService.validateUser(userName, password);
     if (!user) {
       console.log("Unable to validate user with username: ", userName);
       return false;
     }
     return user;
   }
 }