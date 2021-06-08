/**
 * 2021 Jacob Stevens
 * Strategy for extracting a JWT from the request cookie, and validating the request using the saved
 * hashed token in the database 
 */

 import { ExtractJwt, Strategy } from 'passport-jwt';
 import { PassportStrategy } from '@nestjs/passport';
 import { Injectable } from '@nestjs/common';
 import { Request } from 'express';
 import { UserService } from '../../providers/user.service';
import { ConfigService } from '@nestjs/config';
 //import { jwtConstants } from '../config/constants';
  
 @Injectable()
 export class JwtRefreshStrategy extends PassportStrategy(
   Strategy,
   'jwt'
 ) {
   constructor(
     private readonly userService: UserService,
     private configService: ConfigService
   ) {
     super({
       jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
         return request?.cookies?.Refresh;
       }]),
       secretOrKey: configService.get('REFRESH_SECRET'),
       passReqToCallback: true,
       ignoreExpiration: false
     });
   }
  
   /**
    * Method that performs the validation of the extracted refresh token 
    * @param request the request, exposing its cookies 
    * @param payload the JWT payload
    * @returns true if a match, false otherwise.
    */
   async validate(request: Request, payload: any) {
     const refreshToken = request.cookies?.Refresh;
     return false;
   }
 }