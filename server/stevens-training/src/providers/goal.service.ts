import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Goal } from '../entities/goal.entity';
import { Repository } from 'typeorm';
import { GoalDto } from "../entities/dto/goal.dto";
import { UserService } from "./user.service";

@Injectable()
export class GoalService {
    constructor(@InjectRepository(Goal) private goalRepo: Repository<Goal>,
                private userService: UserService
                ) {}
    async create(newGoal: GoalDto, userId: string): Promise<Goal> {
        const user = await this.userService.findOne(userId);
        if(!user) return null; 
        const goal = new Goal();
        goal.user = user; 
        goal.desc = newGoal.desc; 
        goal.name = newGoal.name; 
        goal.targetDate = newGoal.targetDate; 
    }
    async markComplete(goalId: string): Promise<Goal> {
        const goal = await this.goalRepo.findOne(goalId);
        if(!goal) return null; 
        goal.complete = true; 
        return goal; 
    }
    async remove(goalId: string): Promise<void> {
        this.goalRepo.delete(goalId);
    }
}