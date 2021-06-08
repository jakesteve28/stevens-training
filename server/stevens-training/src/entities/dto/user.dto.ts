import {
    IsUUID,
    Length,
    IsLatitude,
    IsLongitude,
    IsEmail
} from 'class-validator';

export class UserDto {
    @Length(2, 128)
    firstName: string;

    @Length(2, 128) 
    lastName: string;
    
    @IsEmail()
    email: string;

    @Length(4, 50)
    userName: string;

    @Length(8, 32)
    password: string;
}