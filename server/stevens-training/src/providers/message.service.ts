import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageDto } from "../entities/dto/message.dto";
import { Message } from "../entities/message.entity";
import { Repository } from "typeorm";
import { UserService } from "./user.service";
import { User } from "src/entities/user.entity";

@Injectable()
export class MessageService {
    constructor(@InjectRepository(Message) private msgRepo: Repository<Message>,
                @Inject(forwardRef(() => UserService))
                private userService: UserService
    ){}
    
    async create(newMsg: MessageDto): Promise<Message> {
        const sender = await this.userService.findOne(newMsg.senderId); 
        const recipient = await this.userService.findOne(newMsg.recipientId); 
        if(!sender || !recipient) return null;
        const message = new Message();
        message.body = newMsg.body; 
        message.recipient = recipient; 
        message.sender = sender; 
        return this.msgRepo.save(message);
    }

    async findOne(id: string): Promise<Message> {
        return this.msgRepo.findOne(id);
    }

    async remove(msgId: string): Promise<void> {
        this.msgRepo.delete(msgId); 
    }
    
    async markSeen(msgId: string): Promise<Message> {
        const message = await this.msgRepo.findOne(msgId); 
        message.seen = true;
        return this.msgRepo.save(message);
    }
}