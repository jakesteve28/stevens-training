/**
 * 2021 Jacob Stevens
 */

 import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
 
 @Entity()  
 export class Goal {
   @PrimaryGeneratedColumn("uuid")
   id: string
 
   @Column()
   name: string;
 
   @Column()
   desc: string;
 
   @Column()
   targetDate: number;
 
   @CreateDateColumn()
   createdAt: string;
 }