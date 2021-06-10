import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExerciseDto } from "../entities/dto/exercise.dto";
import { Repository } from "typeorm";
import { Exercise } from "../entities/exercise.entity";
import { WorkoutService } from "./workout.service";
import { HasUploads } from "./story.service";
import { UploadService } from "./upload-file.service";

@Injectable()
export class ExerciseService implements HasUploads {

    constructor(@InjectRepository(Exercise) 
                private exerciseRepository: Repository<Exercise>,
                @Inject(forwardRef(() => WorkoutService))
                private workoutService: WorkoutService,
                @Inject(forwardRef(() => UploadService))
                private uploadService: UploadService
                ) {}

    async create(exerciseDto : ExerciseDto): Promise<Exercise> {
        const exercise = new Exercise();
        exercise.desc = exerciseDto.desc; 
        exercise.name = exerciseDto.name; 
        exercise.exerciseType = exerciseDto.exerciseType; 
        return this.exerciseRepository.save(exercise); 
    }

    async delete(exerciseId: string): Promise<void> {
        this.exerciseRepository.delete(exerciseId); 
    }

    async addUpload(exerciseId: string, uploadId: string): Promise<Exercise> {
        const exercise = await this.exerciseRepository.findOne(exerciseId);
        if(!exercise) return null;
        if(exercise.uploads.some(element => element.id === uploadId)) {
            return null; 
        }
        const _upload = await this.uploadService.setEntityId(uploadId, exercise.id); 
        exercise.uploads.push(_upload); 
        return this.exerciseRepository.save(exercise);
    }

    async removeUpload(exerciseId: string, uploadId: string): Promise<Exercise> {
        const exercise = await this.exerciseRepository.findOne(exerciseId);
        if(!exercise) return null;
        if(exercise.uploads.some(element => element.id === uploadId)) {
            exercise.uploads = exercise.uploads.filter(async upload => {
                if(upload.id === uploadId){
                    await this.uploadService.remove(uploadId);
                }
                return upload.id !== uploadId;
            });
            return this.exerciseRepository.save(exercise); 
        }
        return exercise;
    }

    async findOne(id: string): Promise<Exercise> {
        return this.exerciseRepository.findOne(id); 
    }

    async getByWorkout(workoutId: string): Promise<{ map: any, supersets: any }> {
        const workout = await this.workoutService.findOne(workoutId); 
        if(!workout) return null;
        return { map: workout.exerciseMapping, supersets: workout.supersetMapping }
    }

}
