/**
 * 2021 Jacob Stevens
 */

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Exercise } from './exercise.entity';
import { MediaUpload } from './media-upload.entity';
import { User } from './user.entity';
 
export enum WorkoutFocus {
  strength = "Strength", 
  power = "Power", 
  intervals = "Intervals", 
  failure = "Failure",
  dropsets = "Drop Sets",
  cardio = "Cardio", 
  mix = "Mix", 
  flexibility = "Flexibility",
  other = "Other",
  bodybuilding= "Bodybuilding",
  heavy = "Heavy",
  pump = "Pump",
  metabolic ="Metabolic",
  speed = "Speed",
  stability = "Stability",
  control = "Control",
  dynamic = "Dynamic",
  aerobic = "Aerobic",
  explosive = "Explosive",
  max = "Max",
  endurance = "Endurance",
  anaerobic = "Anaerobic"
}

/**
Bodybuilding
Heavy
Reps
Metabolic
Speed 
Stability
Control
Dynamic
Aerobic
Explosive
Limit Test
Endurance
Anaerobic
*/

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

   @Column("simple-json")
   exerciseMapping: { exercises: Array<{ mappingId: string, exercise: Exercise, sets: number, reps: number, duration: number, distance: number, order: number }> }
 
   @Column("simple-json")
   supersetMapping: { supersets: Array<any> }

   @CreateDateColumn()
   createdAt: string;

   @Column({ type: "simple-json" })
   uploads: Array<MediaUpload>;

   @Column({ default: "" })
   primaryUpload: string;

   @Column({ default: true })
   viewable: boolean; 

 }