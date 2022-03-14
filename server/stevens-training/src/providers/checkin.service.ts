import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Checkin } from '../entities/checkin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CheckinService {
    constructor(@InjectRepository(Checkin) private checkinRepo: Repository<Checkin>) {}
    async create(userId: string, placeId: string): Promise<Checkin> {
        const checkin = new Checkin();
        checkin.userId = userId; 
        checkin.placeId = placeId; 
        checkin.timeEntered = Date.now(); 
        return checkin;
    }
    async checkOut(userId: string, checkinId: string): Promise<Checkin> {
        const checkin = await this.checkinRepo.findOne(checkinId);
        checkin.timeLeft = Date.now(); 
        await this.checkinRepo.save(checkin); 
        return checkin; 
    }
    async getCheckins(userId: string): Promise<Checkin[]> {
        return this.checkinRepo.find({ where: { userId: userId }}); 
    }
    async deleteCheckin(id: string): Promise<void> {
        this.checkinRepo.delete(id);
    }
}