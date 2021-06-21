import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { NotificationGuard } from "../guards/notification.auth-guard";
import { UserService } from "../providers/user.service";
import { Request, Response } from "express";
import { Logger, UseGuards } from "@nestjs/common";
import { WsLocationDto, WsMessageDto, WsStatusDto } from "./notification.types";
import { Message } from "../entities/message.entity";
import { User } from "../entities/user.entity";


const preflightCheck = (req: Request, res: Response) => {
    const headers = {
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Origin": process.env.DOMAIN, 
        "Access-Control-Allow-Credentials": "true"
    };
    res.writeHead(200, headers);
    res.end();
  }


@WebSocketGateway({ namespace: 'notifications', handlePreflightRequest: preflightCheck })
@UseGuards(NotificationGuard)
export class NotificationGateway {
    constructor(private userService: UserService) { }

    private readonly logger: Logger = new Logger(NotificationGateway.name);

    @SubscribeMessage('message')
    async handleMessage(@MessageBody() data: any): Promise<Message> {
        try {
            if(data && data?.message && data.message instanceof WsMessageDto) {
                this.logger.log(`Creating new message for user ${data.message.senderId} to ${data.message.recipientId}`); 
                const message = await this.userService.sendMessage(data.message.senderId, data.message.body, data.message.recipientId); 
                if(!message) { this.logger.log(`Error creating new message`); return null; }
                else return message;  
            } else {
                this.logger.log(`Malformed data received for send new message ${JSON.stringify(data)}`); 
                return null; 
            }
        } catch(err) {
            this.logger.log(`Fatal error creating new message ${err}`);
            return null; 
        }
    }
    @SubscribeMessage('updatelocation')
    async handleLocationUpdate(@MessageBody() data): Promise<User> {
        try {
            if(data && data?.message && data.message instanceof WsLocationDto) {
                this.logger.log(`Updating location for user ${data.message.userId} to lat ${data.message.latitude} | long ${data.message.longitude}`); 
                const user = await this.userService.updateLocation(data.message.userId, data.message.latitude, data.message.longitude); 
                if(!user) { this.logger.log(`Error updating user location`); return null; }
                else return user;  
            } else {
                this.logger.log(`Malformed data received for location update ${JSON.stringify(data)}`); 
                return null; 
            }
        } catch(err) {
            this.logger.log(`Fatal error updating location ${err}`);
            return null; 
        }
    }
    @SubscribeMessage('updatestatus')
    async handleStatusUpdate(@MessageBody() data): Promise<User> {
        try {
            if(data && data?.message && data.message instanceof WsStatusDto) {
                this.logger.log(`Updating status for user ${data.message.userId} to ${data.message.status}`); 
                const user = await this.userService.updateStatus(data.message.userId, data.message.status); 
                if(!user) { this.logger.log(`Error updating status`); return null; }
                else return user;  
            } else {
                this.logger.log(`Malformed data received for updating status ${JSON.stringify(data)}`); 
                return null; 
            }
        } catch(err) {
            this.logger.log(`Fatal error updating status ${err}`);
            return null; 
        }
    }
    @SubscribeMessage('updateworkout')
    async handleWorkoutUpdate(@MessageBody() data): Promise<User> {
        try {
            if(data && data?.message && data.message instanceof WsMessageDto) {
                this.logger.log(`Creating new message for user ${data.message.senderId} to ${data.message.recipientId}`); 
                const message = await this.userService.sendMessage(data.message.senderId, data.message.body, data.message.recipientId); 
                if(!message) { this.logger.log(`Error creating new message`); return null; }
                else return message;  
            } else {
                this.logger.log(`Malformed data received for send new message ${JSON.stringify(data)}`); 
                return null; 
            }
        } catch(err) {
            this.logger.log(`Fatal error creating new message ${err}`);
            return null; 
        }
    }
    @SubscribeMessage('connect')
    async handleConnect(@ConnectedSocket() client: Socket, @MessageBody() data) {
        try {
            if(data && data?.message && data.message instanceof WsMessageDto) {
                this.logger.log(`Creating new message for user ${data.message.senderId} to ${data.message.recipientId}`); 
                const message = await this.userService.sendMessage(data.message.senderId, data.message.body, data.message.recipientId); 
                if(!message) { this.logger.log(`Error creating new message`); return null; }
                else return message;  
            } else {
                this.logger.log(`Malformed data received for send new message ${JSON.stringify(data)}`); 
                return null; 
            }
        } catch(err) {
            this.logger.log(`Fatal error creating new message ${err}`);
            return null; 
        }
    }
    @SubscribeMessage('disconnect')
    async handleDisconnect(@ConnectedSocket() client: Socket, @MessageBody() data) {
        try {
            if(data && data?.message && data.message instanceof WsMessageDto) {
                this.logger.log(`Creating new message for user ${data.message.senderId} to ${data.message.recipientId}`); 
                const message = await this.userService.sendMessage(data.message.senderId, data.message.body, data.message.recipientId); 
                if(!message) { this.logger.log(`Error creating new message`); return null; }
                else return message;  
            } else {
                this.logger.log(`Malformed data received for send new message ${JSON.stringify(data)}`); 
                return null; 
            }
        } catch(err) {
            this.logger.log(`Fatal error creating new message ${err}`);
            return null; 
        }
    }
    @SubscribeMessage('refresh')
    async refreshSocket(@ConnectedSocket() client: Socket, @MessageBody() data): Promise<User> {
        try {
            if(data && data?.message && data.message instanceof WsMessageDto) {
                this.logger.log(`Creating new message for user ${data.message.senderId} to ${data.message.recipientId}`); 
                const message = await this.userService.sendMessage(data.message.senderId, data.message.body, data.message.recipientId); 
                if(!message) { this.logger.log(`Error creating new message`); return null; }
                else return message;  
            } else {
                this.logger.log(`Malformed data received for send new message ${JSON.stringify(data)}`); 
                return null; 
            }
        } catch(err) {
            this.logger.log(`Fatal error creating new message ${err}`);
            return null; 
        }
    }
}