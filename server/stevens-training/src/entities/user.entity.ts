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

   @Column()
   height: number; 

   @Column()
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
   profilePicture: string;
 
   @Column({ default: "" })
   refreshToken: string;

   @Column({ default: "" })
   currentWorkoutId: string;

   @OneToMany(type => Workout, workout => workout.user)
   workouts: Workout[];

   @OneToMany(type => Exercise, exercise => exercise.user)
   exercises: Exercise[]; 

   @OneToMany(type => MediaUpload, upload => upload.user)
   uploads: MediaUpload[]; 

   @OneToMany(type => Goal, goal => goal.user)
   goals: Goal[];

   @OneToMany(type => Message, message => message.sender)
   sentmessages: Message[];
  
   @OneToMany(type => Message, message => message.recipient)
   receivedmessages: Message[];

   @OneToOne(type => Story, story => story.user)
   story: Story;

   @CreateDateColumn()
   createdAt: string;

 }