/**
 * 2021 Jacob Stevens
 */

 import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
 
 @Entity()  
 export class WorkoutClass {
   @PrimaryGeneratedColumn("uuid")
   id: string
 
   @Column()
   name: string;

 }

 /**
  * Should consist of a list
  * Lifting, Cardio, Mixed, Sports, Other
  */