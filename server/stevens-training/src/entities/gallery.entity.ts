/**
 * 2021 Jacob Stevens
 */

 import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MediaUpload } from './media-upload.entity';
 
 @Entity()  
 export class Gallery {
   @PrimaryGeneratedColumn("uuid")
   id: string
   @OneToMany(type => MediaUpload, upload => upload.gallery)
   uploads: MediaUpload[];
 }