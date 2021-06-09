/**
 * 2021 Jacob Stevens
 */

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne } from 'typeorm';
import { MediaUpload } from './media-upload.entity';
import { User } from './user.entity';
 
 @Entity()  
 export class Story {
   @PrimaryGeneratedColumn("uuid")
   id: string
 
   @OneToOne(type => User, user => user.story)
   user: User;

   @Column({ type: "simple-json" })
   uploads: Array<MediaUpload>;
 
   @CreateDateColumn()
   createdAt: string;

 }