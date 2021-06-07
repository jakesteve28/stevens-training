import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WorkoutDto } from "../entities/dto/workout.dto";
import { Repository } from "typeorm";
import { Workout } from "../entities/workout.entity";

@Injectable()
export class WorkoutService {
    constructor(
        @InjectRepository(Workout)
        private workoutRepo: Repository<Workout>
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

    async addExercise(exerciseId: string, sets: number, reps: number, duration: number): Promise<Workout> {
        
        return null;
    }

    async removeExercise(exerciseId: string): Promise<Workout> {

        return null;
    }
    
}