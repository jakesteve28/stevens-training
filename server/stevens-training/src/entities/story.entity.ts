/**
 * 2021 Jacob Stevens
 */

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne } from 'typeorm';
import { MediaUpload } from './media-upload.entity';
import { User } from './user.entity';
 
 @Entity()  
 export class Story {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Column({ type: "simple-array" })
   uploads: Array<MediaUpload>;
 
   @CreateDateColumn()
   createdAt: string;

 }