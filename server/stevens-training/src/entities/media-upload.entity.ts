/**
 * 2021 Jacob Stevens
 */

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Gallery } from './gallery.entity';
import { User } from './user.entity';
 
export enum UploadType {
  ProfilePic = "ProfilePic", 
  Story = "Story",
  Exercise = "Exercise",
  Workout = "Workout",
  Place = "Place"
}

 @Entity()  
 export class MediaUpload {
   @PrimaryGeneratedColumn("uuid")
   id: string
 
   @Column({ default: "" })
   path: string;

   @Column({ default: "" })
   entityId: string;

   @Column({ default: "" })
   desc: string;

   @Column({ type: "enum" })
   uploadType: UploadType;
 
   @CreateDateColumn()
   createdAt: string;

   @ManyToOne(type => User, user => user.uploads)
   user: User;

 }