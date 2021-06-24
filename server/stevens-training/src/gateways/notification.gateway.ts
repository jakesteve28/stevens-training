import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { NotificationGuard } from "../guards/notification.auth-guard";
import { UserService } from "../providers/user.service";
import { Request, Response } from "express";
import { Logger, UseGuards } from "@nestjs/common";
import { WsLocationDto, WsMessageDto, WsSocketUpdate, WsStatusDto, WsWorkoutDto } from "./notification.types";
import { Message } from "../entities/message.entity";
import { User } from "../entities/user.entity";


const preflightCheck = (req: Request, res: Response) => {
    const headers = {
        "Access-Control-Allow-Headers": "Access-Control-Allow-Credentials, credentials, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Authorization, Refresh, Access-Control-Request-Method, Access-Control-Request-Headers",
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        "Access-Control-Allow-Origin": "https://localhost:19006", 
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

    @SubscribeMessage('test')
    async handleTest(){
        this.logger.log("Test working")
    }
    @SubscribeMessage('message')
    async handleMessage(@MessageBody() data: any): Promise<Message> {
        try {
            if(data && data?.notification && data.notification instanceof WsMessageDto) {
                this.logger.log(`Creating new message for user ${data.notification.senderId} to ${data.notification.recipientId}`); 
                const message = await this.userService.sendMessage(data.notification.senderId, data.notification.body, data.notification.recipientId); 
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
            if(data && data?.message && data.notification instanceof WsLocationDto) {
                this.logger.log(`Updating location for user ${data.notification.userId} to lat ${data.notification.latitude} | long ${data.notification.longitude}`); 
                const user = await this.userService.updateLocation(data.notification.userId, data.notification.latitude, data.notification.longitude); 
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
            if(data && data?.message && data.notification instanceof WsStatusDto) {
                this.logger.log(`Updating status for user ${data.notification.userId} to ${data.notification.status}`); 
                const user = await this.userService.updateStatus(data.notification.userId, data.notification.status); 
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
            if(data && data?.message && data.notification instanceof WsWorkoutDto) {
                this.logger.log(`Updating current workout for user ${data.notification.userId} to ${data.notification.workoutId}`); 
                const user = await this.userService.setCurrentWorkout(data.notification.userId, data.notification.workoutId); 
                if(!user) { this.logger.log(`Error updating current workout`); return null; }
                else return user;  
            } else {
                this.logger.log(`Malformed data received for update current workout ${JSON.stringify(data)}`); 
                return null; 
            }
        } catch(err) {
            this.logger.log(`Fatal error update current workout ${err}`);
            return null; 
        }
    }
    @SubscribeMessage('socketupdate')
    async handleConnect(@ConnectedSocket() client: Socket,@MessageBody() data): Promise<User> {
        if(data && data?.message && data.notification instanceof WsSocketUpdate) {
            this.logger.log(`User connected with socket ID ${client.id}`);
            const user = await this.userService.setSocketId(data.userId, data.socketId); 
            if(!user) { this.logger.log(`Error updating socket ID for user`); return null; }
            return user; 
        } else {
            this.logger.log(`Malformed data received for update docketId ${JSON.stringify(data)}`); 
            return null; 
        }

    }
    @SubscribeMessage('disconnect')
    async handleDisconnect(@ConnectedSocket() client: Socket, @MessageBody() data) {
        
    }
}