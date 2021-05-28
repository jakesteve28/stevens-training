/**
 * 2021 Jacob Stevens
 */

 import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
 
 @Entity()  
 export class User {
   @PrimaryGeneratedColumn("uuid")
   id: string
 
   @Column()
   firstName: string;
 
   @Column()
   lastName: string;
 
   @Column()
   email: string;
 
   @Column()
   password: string;
   
   @Column()
   userName: string;

   @Column()
   storyId: string;
 
   @Column({ default: false })
   isOnline: boolean;
 
   @CreateDateColumn()
   createdAt: string;
 
   @Column({ default: false })
   disabled: boolean;
 
   @Column({ default: "" })
   profilePicture: string;
 
   @Column({ default: "" })
   refreshToken: string;

   @Column()
   status: string; 

   @Column()
   currentWorkoutId: string;

   @Column()
   userStatsId: string;

 }