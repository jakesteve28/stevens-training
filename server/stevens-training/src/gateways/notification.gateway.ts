import { MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway({ namespace: 'notifications' })
export class NotificationGateway {
    @SubscribeMessage('message')
    async handleMessage(@MessageBody() data) {

    }
}