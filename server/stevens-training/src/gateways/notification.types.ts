import { IsLatitude, IsLongitude, IsUUID, Length } from "class-validator";
export class WsMessageDto {
    @IsUUID()
    senderId: string;

    @IsUUID()
    recipientId: string; 

    @Length(2, 512)
    body: string; 
}
export class WsLocationDto {
    @IsUUID()
    userId: string;

    @IsLatitude()
    latitude: string; 

    @IsLongitude()
    longitude: string; 
}
export class WsStatusDto {
    @IsUUID()
    userId: string;

    @Length(2, 512)
    status: string;     
}
export class WsWorkoutDto {
    @IsUUID()
    userId: string; 
    @IsUUID()
    workoutId: string;
}
export class WsSocketUpdate {
    @IsUUID()
    userId: string; 
    socketId: string;
}
