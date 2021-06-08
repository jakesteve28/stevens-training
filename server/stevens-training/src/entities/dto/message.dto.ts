import {
    IsUUID,
    Length,
} from 'class-validator';

export class MessageDto {
    @Length(1, 512)
    body: string; 

    @IsUUID()
    senderId: string; 

    @IsUUID()
    recipientId: string;
}