import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageDto } from "../entities/dto/message.dto";
import { Message } from "../entities/message.entity";
import { Repository } from "typeorm";

@Injectable()
export class MessageService {
    constructor(@InjectRepository(Message) private msgRepo: Repository<Message>){}
    async create(newMsg: MessageDto): Promise<Message> {
        return null;
    }
    async remove(msgId: string): Promise<void> {
        return null;
    }
    async markSeen(msgId: string): Promise<Message> {
        return null;
    }
}