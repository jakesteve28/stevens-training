/**
 * 2021 Jacob Stevens
 */

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, OneToOne } from 'typeorm';
import { Exercise } from './exercise.entity';
import { Goal } from './goal.entity';
import { MediaUpload } from './media-upload.entity';
import { Message } from './message.entity';
import { Story } from './story.entity';
import { Workout } from './workout.entity';
 
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
 
   @Column({ default: false })
   isOnline: boolean;

   @Column({ default: "" })
   socketId: string;

   @Column({ default: -1 })
   height: number; 

   @Column({ default: -1 })
   weight: number;

   @Column({ default: true})
   darkMode: boolean; 

   @Column({ default: "" })
   maxes: string;

   @Column({ default: "" })
   status: string; 
 
   @Column({ default: false })
   disabled: boolean;
 
   @Column({ default: "" })
   storyId: string;

   @Column({ type: "simple-array" })
   profilePictures: Array<MediaUpload>;
 
   @Column({ default: "" })
   refreshToken: string;

   @Column({ default: "" })
   currentWorkoutId: string;

   @Column({ default: "" })
   latitude: string; 

   @Column({ default: "" })
   longitude: string; 

   @Column({ default: "" })
   primaryUpload: string;

   @OneToMany(type => Workout, workout => workout.user, { eager: true })
   workouts: Workout[];

   @OneToMany(type => Exercise, exercise => exercise.user, { eager: true })
   exercises: Exercise[]; 

   @OneToMany(type => MediaUpload, upload => upload.user, { eager: true })
   uploads: MediaUpload[]; 

   @OneToMany(type => Goal, goal => goal.user, { eager: true })
   goals: Goal[];

   @OneToMany(type => Message, message => message.sender, { eager: true })
   sentmessages: Message[];
  
   @OneToMany(type => Message, message => message.recipient, { eager: true })
   receivedmessages: Message[];

   @CreateDateColumn()
   createdAt: string;

 }