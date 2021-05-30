import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Workout } from "../entities/workout.entity";

@Injectable()
export class WorkoutService {
    constructor(
        @InjectRepository(Workout)
        private userRepository: Repository<Workout>
    ) {}

    async create(workoutDto: WorkoutDto): Promise<Workout> {

        return null;
    }

    async findOne(id: string): Promise<Workout> {

        return null;
    }

    async findAll(): Promise<Workout> {

        return null;
    }

    async remove(id: string): Promise<void> {

        return null;
    }

    async update(newFields: any): Promise<Workout> {

        return null;
    }
    
}