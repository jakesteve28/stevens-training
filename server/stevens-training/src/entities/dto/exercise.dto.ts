import { ExerciseType } from "../exercise.entity";

export interface ExerciseDto {
    name: string; 
    desc: string; 
    exerciseType: ExerciseType 
}