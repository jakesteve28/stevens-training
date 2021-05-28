/**
 * 2021 Jacob Stevens
 */

 import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
 
 @Entity()  
 export class Workout {
   @PrimaryGeneratedColumn("uuid")
   id: string
 
   @Column()
   name: string;
 
   @Column()
   desc: string;

   @Column()
   classificationId: string;

   @Column()
   userId: string; 
 
   @Column()
   targetDate: number;
 
   @CreateDateColumn()
   createdAt: string;

   @Column()
   exercisesJSON: string;

 }