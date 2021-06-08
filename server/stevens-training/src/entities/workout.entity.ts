/**
 * 2021 Jacob Stevens
 */

 import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
 
export enum WorkoutFocus {
  strength = "Strength", 
  power = "Power", 
  stability = "Stability",
  endurance = "Endurance", 
  control = "Control", 
  intervals = "Intervals", 
  failure = "Failure",
  dropsets = "Drop Sets",
  cardio = "Cardio", 
  mix = "Mix", 
  flexibility = "Flexibility",
  other = "Other"
}

 @Entity()  
 export class Workout {
   @PrimaryGeneratedColumn("uuid")
   id: string
 
   @Column()
   name: string;
 
   @Column()
   desc: string;

   @ManyToOne(type => User, user => user.workouts)
   user: User; 

   @Column({ type: "enum", enum: WorkoutFocus })
   workoutFocus: WorkoutFocus; 
 
   @CreateDateColumn()
   createdAt: string;

 }