import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExerciseDto } from "../entities/dto/exercise.dto";
import { Repository } from "typeorm";
import { Exercise } from "../entities/exercise.entity";
import { WorkoutService } from "./workout.service";

@Injectable()
export class ExerciseService {

    constructor(@InjectRepository(Exercise) 
                private exerciseRepository: Repository<Exercise>,
                @Inject(forwardRef(() => WorkoutService))
                private workoutService: WorkoutService) {}

    async create(exerciseDto : ExerciseDto): Promise<Exercise> {
        return null;
    }

    async update(): Promise<Exercise> {
        return null;
    }

    async delete(): Promise<void> {
        return null;
    }

    async addMedia(): Promise<Exercise> {
        return null;
    }
    
    async removeMedia(): Promise<Exercise> {
        return null;
    }

    async findOne(id: string): Promise<Exercise> {
        return null;
    }

    async getByWorkoutOrdered(): Promise<{}> {
        return {

        };
    }

    async getByWorkout(): Promise<Exercise[]> {
        return null;
    }

}
