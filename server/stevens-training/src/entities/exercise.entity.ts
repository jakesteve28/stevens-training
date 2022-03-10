/**
 * 2021 Jacob Stevens
 */

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { MediaUpload } from './media-upload.entity';
import { User } from './user.entity';
 
export enum ExerciseType {
  lifting = "Lifting",
  cardio = "Cardio",
  stretching = "Stretching", 
  calisthenic = "Calisthenic",
  plyometric = "Plyometric"
}

 @Entity()  
 export class Exercise {
   @PrimaryGeneratedColumn("uuid")
   id: string
 
   @Column({ default: "" })
   name: string;
 
   @Column({ default: "" })
   desc: string;

   @Column({ type: "simple-json" })
   uploads: Array<MediaUpload>;
   
   @Column({ type: "enum", enum: ExerciseType })
   exerciseType: ExerciseType;
 
   @CreateDateColumn()
   createdAt: string;

   @ManyToOne(type => User, user => user.exercises)
   user: User;

   @Column({ default: "" })
   primaryUpload: string;

   @Column({ default: true })
   viewable: boolean; 

 }