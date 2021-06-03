/**
 * 2021 Jacob Stevens
 */

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
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
 
   @Column()
   name: string;
 
   @Column()
   desc: string;

   @Column( { default: "" } )
   galleryId: string;
   
   @Column({ type: "enum" })
   exerciseType: ExerciseType;
 
   @CreateDateColumn()
   createdAt: string;

   @ManyToOne(type => User, user => user.exercises)
   user: User;
 }