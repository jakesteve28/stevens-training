import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WorkoutDto } from "../entities/dto/workout.dto";
import { Repository } from "typeorm";
import { Workout } from "../entities/workout.entity";
import { User } from "../entities/user.entity";
import { ExerciseService } from "./exercise.service";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { uuid } from "uuidv4";

@Injectable()
export class WorkoutService {
    constructor(
        @InjectRepository(Workout)
        private workoutRepo: Repository<Workout>,
        @Inject(forwardRef(() => ExerciseService))
        private exerciseService: ExerciseService
    ) {}

    async create(user: User, workoutDto: WorkoutDto): Promise<Workout> {
        const workout = new Workout();
        workout.desc = workoutDto.desc; 
        workout.name = workoutDto.name; 
        workout.workoutFocus = workoutDto.workoutFocus; 
        workout.user = user;
        return this.workoutRepo.save(workout);
    }

    async findOne(id: string): Promise<Workout> {
        return this.workoutRepo.findOne(id);
    }

    async findAll(): Promise<Workout[]> {
        return this.workoutRepo.find(); 
    }

    async remove(id: string): Promise<void> {
        this.workoutRepo.delete(id);
        return;
    }

    async addExercise(id: string, exerciseId: string, sets: number, reps?: number, duration?: number, distance?: number, order?: number): Promise<Workout> {
        const workout = await this.workoutRepo.findOne(id);
        if(!workout) return null; 
        const exercise = await this.exerciseService.findOne(exerciseId); 
        if(!exercise) return null; 
        if(workout.exerciseMapping.exercises.some(element => element.exercise.id === exercise.id )) {
            return null;
        } else {
            workout.exerciseMapping.exercises.push({ mappingId: uuidv4(), exercise: exercise, reps: reps, sets: sets, duration: duration, distance: distance, order: order });
            return this.workoutRepo.save(workout);
        }           
    } 

    async removeExercise(id: string, mappingId: string): Promise<Workout> {
        const workout = await this.workoutRepo.findOne(id); 
        if(!workout) return null; 
        if(workout.exerciseMapping.exercises.some(element => element.mappingId === mappingId)) {
            workout.exerciseMapping.exercises = _.cloneDeep(workout.exerciseMapping.exercises.filter(element => element.mappingId !== mappingId));
            return this.workoutRepo.save(workout);
        }
        return null;
    }
    
    async changeExercise(id: string, mappingId: string, sets: number, reps?: number, duration?: number, distance?: number): Promise<Workout> {
        const workout = await this.workoutRepo.findOne(id); 
        if(!workout) return null; 
        const mappedExercise = workout.exerciseMapping.exercises.find(element => element.mappingId === mappingId);
        if(mappedExercise) {
            mappedExercise.sets = sets; 
            mappedExercise.reps = reps; 
            mappedExercise.duration = duration;
            mappedExercise.distance = distance; 
            return this.workoutRepo.save(workout);
        }
        return null;
    }

    async createSuperset(id: string, mappedExercises: Array<{ mappingId: string }>): Promise<Workout> {
        const workout = await this.workoutRepo.findOne(id); 
        if(!workout) return null; 
        const superset = {}; 
        let index = 0, mappedAny = false;
        mappedExercises.forEach(element => {
            if(workout.exerciseMapping.exercises.some(el => el.mappingId === element.mappingId )) {
                superset[index] = element.mappingId;
                index++;
                mappedAny = true;            
            }
        })
        if(false === mappedAny) {
            return null;
        }
        superset['id'] = uuidv4(); 
        workout.supersetMapping.supersets.push(superset); 
        return this.workoutRepo.save(workout); 
    }

    async removeSuperset(id: string, supersetId: string): Promise<Workout> {
        const workout = await this.workoutRepo.findOne(id); 
        if(!workout) return null; 
        workout.supersetMapping.supersets = _.cloneDeep(workout.supersetMapping.supersets.filter(element => element.id !== supersetId)); 
        return this.workoutRepo.save(workout);
    }

}