import { ExerciseType } from "../exercise.entity";
import {
    IsEnum,
    Length,
  } from 'class-validator';

export class ExerciseDto {
    @Length(2, 128)
    name: string; 

    @Length(0, 512)
    desc: string; 

    @IsEnum(ExerciseType)
    exerciseType: ExerciseType 
}