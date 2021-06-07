import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Goal } from '../entities/goal.entity';
import { Repository } from 'typeorm';
import { GoalDto } from "src/entities/dto/goal.dto";

@Injectable()
export class GoalService {
    constructor(@InjectRepository(Goal) private goalRepo: Repository<Goal>) {}
    async create(newGoal: GoalDto): Promise<Goal> {
        return null;
    }
    async markComplete(goalId: string): Promise<Goal> {
        return null;
    }
    async remove(goalId: string): Promise<void> {
        return;
    }
}