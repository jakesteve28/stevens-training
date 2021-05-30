/**
 * 2021 Jacob Stevens
 */

 import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
 
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

   @ManyToOne(type => User, user => user.goals)
   user: User; 
 }