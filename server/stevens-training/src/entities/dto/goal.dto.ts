import {
    IsInt,
    Length, Max, Min,
  } from 'class-validator';
export class GoalDto {
    @Length(2, 128)
    name: string; 

    @Length(0, 512)
    desc: string; 

    @IsInt()
    @Min(Date.now() - 864000) // Minimum allowed date is yesterday for goals 
    @Max(Date.now() + 77760000) //Maximum allowed date is 90 days from now
    targetDate: number;
}