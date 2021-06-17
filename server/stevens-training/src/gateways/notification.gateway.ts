import { MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway({ namespace: 'notifications' })
export class NotificationGateway {
    @SubscribeMessage('message')
    async handleMessage(@MessageBody() data) {

    }
    @SubscribeMessage('updatelocation')
    async handleLocationUpdate(@MessageBody() data) {

    }
    @SubscribeMessage('updatestatus')
    async handleStatusUpdate(@MessageBody() data) {

    }
}