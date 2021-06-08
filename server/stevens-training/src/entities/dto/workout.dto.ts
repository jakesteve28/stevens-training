import { IsEnum, IsUUID, Length } from "class-validator";
import { WorkoutFocus } from "../workout.entity";

export class WorkoutDto {
    @Length(2, 128)
    name: string; 

    @Length(0, 512)
    desc: string; 

    @IsUUID()
    userId: string

    @IsEnum(WorkoutFocus)
    workoutFocus: WorkoutFocus;
}